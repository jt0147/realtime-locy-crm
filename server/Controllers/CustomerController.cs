using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Net;
using System.Security.Claims;
using VslCrmApiRealTime.Exceptions;
using VslCrmApiRealTime.Interfaces;
using VslCrmApiRealTime.Models.Queries;
using VslCrmApiRealTime.Models.Requests.Customer;
using VslCrmApiRealTime.Models.Responses;

namespace VslCrmApiRealTime.Controllers
{
    /*
    * URL: https://localhost:portnumber/api/v2/customer
    */
    [Route("/api/v2/[controller]")]
    [ApiController]
    public class CustomerController : Controller
    {
        private readonly ICustomerService _customerService;
        private readonly IEmployeeService _employeeService;
        private readonly ICustomerJobService _customerJobService;
        private readonly INotificationService _notificationService;

        public CustomerController(ICustomerService customerService, IEmployeeService employeeService, ICustomerJobService customerJobService, INotificationService notificationService)
        {
            _customerService = customerService;
            _employeeService = employeeService;
            _customerJobService = customerJobService;
            _notificationService = notificationService;
        }

        /**
        * Method -> Url: [GET] -> https://localhost:portnumber/api/v2/customer
        * Description: Lấy dữ liệu về khách hàng trong cơ sở dữ liệu
        */
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetCustomers([FromQuery] CustomerQuery query)
        {
            try
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                var idUser = long.Parse(identity?.Claims.FirstOrDefault(o => o.Type == "Id")?.Value ?? "0");
                var idEmployee = long.Parse(identity?.Claims.FirstOrDefault(o => o.Type == "IDEmployee")?.Value ?? "0");
                var permission = identity?.Claims.FirstOrDefault(o => o.Type == "Permission")?.Value ?? "";

                List<long> idEmployees = new List<long>();
                if ((query.ListType == "all" || query.ListType == "received") && !permission.Contains("1048576") && !permission.Contains("7000") && permission.Contains("7080"))
                {
                    idEmployees = await _employeeService.GetListEmployee(idEmployee);
                }

                var data = await _customerService.GetData(query, permission, idUser, idEmployee, idEmployees);

                var response = new Response()
                {
                    Status = true,
                    Message = "Lấy dữ liệu khách hàng thành công!",
                    Data = data
                };

                return Ok(response);
            }
            catch (Exception e)
            {
                if (e is ErrorException errorException)
                {
                    throw errorException;
                }
                else
                {
                    throw new ErrorException((int)HttpStatusCode.InternalServerError, "Internal server error", "Lỗi lấy dữ liệu khách hàng!");
                }
            }
        }

        /**
        * Method -> Url: [POST] -> https://localhost:portnumber/api/v2/customer
        * Description: Người dùng thực hiện tạo mới khách hàng trên hệ thống
        */
        [Authorize("ManageCustomer")]
        [HttpPost]
        public async Task<IActionResult> CreateCustomer([FromBody] CreateCustomerRequest req)
        {
            try
            {
                var isExistCode = await _customerService.IsExistCodeCustomer(req.Code ?? "");
                var isExistTaxCode = await _customerService.IsExistTaxCodeCustomer(req.TaxCode ?? "");

                if (isExistCode)
                {
                    throw new ErrorException((int)HttpStatusCode.Conflict, "Conflict data", "Mã khách hàng đã tồn tại, vui lòng nhập lại mã khách hàng!");
                }

                if (isExistTaxCode)
                {
                    throw new ErrorException((int)HttpStatusCode.Conflict, "Conflict data", "Mã số thuế đã tồn tại, vui lòng nhập lại mã số thuế!");
                }

                await _customerService.Create(req);

                var response = new Response()
                {
                    Status = true,
                    Message = "Khách hàng " + req.NameVI + " đã được tạo mới!",
                    Data = null
                };

                return StatusCode(201, response);
            }
            catch (Exception e)
            {
                if (e is ErrorException errorException)
                {
                    throw errorException;
                }
                else
                {
                    throw new ErrorException((int)HttpStatusCode.InternalServerError, "Internal server error", "Lỗi tạo khách hàng trên hệ thống!");
                }
            }
        }

        /**
        * Method -> Url: [PUT] -> https://localhost:portnumber/api/v2/customer/{id}
        * Description: Người dùng thực hiện cập nhật thông tin khách hàng trên hệ thống
        */
        [Authorize]
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateCustomer([FromRoute] long id, [FromBody] UpdateCustomerRequest req)
        {
            try
            {
                if (id != req.Id)
                {
                    throw new ErrorException((int)HttpStatusCode.BadRequest, "Bad request", "Lỗi cập nhật khách hàng trên hệ thống!");
                }

                var data = await _customerService.GetById(id);

                if (data == null)
                {
                    throw new ErrorException((int)HttpStatusCode.NotFound, "Not found", "Lỗi cập nhật khách hàng vì khách hàng không tồn tại!");
                }

                if (data.Code != req.Code)
                {
                    var isExistCode = await _customerService.IsExistCodeCustomer(req.Code ?? "");

                    if (isExistCode)
                    {
                        throw new ErrorException((int)HttpStatusCode.Conflict, "Conflict data", "Mã khách hàng đã tồn tại!");
                    }
                }

                if (data.TaxCode != req.TaxCode)
                {
                    var isExistTaxCode = await _customerService.IsExistTaxCodeCustomer(req.TaxCode ?? "");

                    if (isExistTaxCode)
                    {
                        throw new ErrorException((int)HttpStatusCode.Conflict, "Conflict data", "Mã số thuế đã tồn tại!");
                    }
                }

                await _customerService.Update(data, req);

                var response = new Response()
                {
                    Status = true,
                    Message = "Thông tin khách hàng " + data.NameVI + " được cập nhật!",
                    Data = null,
                };

                return Ok(response);
            }
            catch (Exception e)
            {
                if (e is ErrorException errorException)
                {
                    throw errorException;
                }
                else
                {
                    throw new ErrorException((int)HttpStatusCode.InternalServerError, "Internal server error", "Lỗi cập nhật khách hàng trên hệ thống!");
                }
            }
        }

        /**
        * Method -> Url: [PUT] -> https://localhost:portnumber/api/v2/customer/{id}/delete
        * Description: Người dùng thực hiện xoá thông tin khách hàng trên hệ thống
        */
        [Authorize("ManageCustomer")]
        [HttpPut]
        [Route("{id}/delete")]
        public async Task<IActionResult> DeleteCustomer([FromRoute] long id, [FromBody] DeleteCustomerRequest req)
        {
            try
            {
                if (id != req.Id)
                {
                    throw new ErrorException((int)HttpStatusCode.BadRequest, "Bad request", req.FlagDel ? "Lỗi xoá khách hàng trên hệ thống!" : "Lỗi huỷ xoá khách hàng trên hệ thống!");
                }

                var data = await _customerService.GetById(id);

                if (data == null)
                {
                    throw new ErrorException((int)HttpStatusCode.NotFound, "Not found", req.FlagDel ? "Lỗi xoá khách hàng vì khách hàng không tồn tại!" : "Lỗi huỷ xoá khách hàng vì khách hàng không tồn tại!");
                }

                await _customerService.Delete(data, req);

                var response = new Response()
                {
                    Status = true,
                    Message = req.FlagDel ? "Đã xoá khách hàng " + data.NameVI + " thành công!" : "Đã huỷ xoá khách hàng " + data.NameVI + " thành công!",
                    Data = null,
                };

                return Ok(response);
            }
            catch (Exception e)
            {
                if (e is ErrorException errorException)
                {
                    throw errorException;
                }
                else
                {
                    throw new ErrorException((int)HttpStatusCode.InternalServerError, "Internal server error", req.FlagDel ? "Lỗi xoá khách hàng trên hệ thống!" : "Lỗi huỷ xoá khách hàng trên hệ thống!");
                }
            }
        }

        /**
        * Method -> Url: [DELETE] -> https://localhost:portnumber/api/v2/customer/{id}
        * Description: Người dùng thực hiện xoá thông tin khách hàng trên hệ thống
        */
        [Authorize("ManageCustomer")]
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> RemoveCustomer([FromRoute] long id)
        {
            try
            {
                var data = await _customerService.GetById(id);

                if (data == null)
                {
                    throw new ErrorException((int)HttpStatusCode.NotFound, "Not found", "Lỗi xoá khách hàng vì khách hàng không tồn tại!");
                }

                await _customerService.Remove(data);

                var response = new Response()
                {
                    Status = true,
                    Message = "Thông tin khách hàng " + data.NameVI + " được xoá!",
                    Data = null,
                };

                return Ok(response);
            }
            catch (Exception e)
            {
                if (e is ErrorException errorException)
                {
                    throw errorException;
                }
                else
                {
                    throw new ErrorException((int)HttpStatusCode.InternalServerError, "Internal server error", "Lỗi xoá khách hàng trên hệ thống!");
                }
            }
        }

        /**
        * Method -> Url: [PUT] -> https://localhost:portnumber/api/v2/customer/choose
        * Description: Người dùng thực hiện nhận khách hàng trên hệ thống
        */
        [Authorize]
        [HttpPut]
        [Route("choose")]
        public async Task<IActionResult> ChooseCustomers([FromBody] ChooseCustomerRequest req)
        {
            try
            {
                var data = await _customerJobService.GetCustomersByIdArray(req.IDCustomers);

                if (data == null)
                {
                    throw new ErrorException((int)HttpStatusCode.NotFound, "Not found", "Lỗi nhận khách hàng trên hệ thống!");
                }

                await _customerJobService.ChooseCustomers(data, req);

                var notification = await _notificationService.Create(7, req.IDUser, null);

                var response = new Response()
                {
                    Status = true,
                    Message = "Bạn đã nhận khách hàng thành công",
                    Data = new {
                        IDSender = notification?.IdNguoiGui,
                        IDReceiver = notification?.IdNguoiNhan,
                        CreatedAt = notification?.Cd,
                    },
                };

                return Ok(response);
            }
            catch (Exception e)
            {
                if (e is ErrorException errorException)
                {
                    throw errorException;
                }
                else
                {
                    throw new ErrorException((int)HttpStatusCode.InternalServerError, "Internal server error", "Lỗi nhận khách hàng trên hệ thống!");
                }
            }
        }

        /**
        * Method -> Url: [PUT] -> https://localhost:portnumber/api/v2/customer/delivery
        * Description: Người dùng thực hiện giao khách hàng trên hệ thống
        */
        /*[Authorize("DeliveryCustomer")]
        [HttpPut]
        [Route("delivery")]
        public async Task<IActionResult> DeliveryCustomers([FromBody] DeliveryCustomerRequest req)
        {
            try
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                var idUser = long.Parse(identity?.Claims.FirstOrDefault(o => o.Type == "Id")?.Value ?? "0");
                var data = await _customerJobService.GetCustomersByIdArray(req.IdCustomers);

                if (data == null)
                {
                    throw new ErrorException((int)HttpStatusCode.NotFound, "Not found", "Lỗi giao khách hàng trên hệ thống!");
                }

                await _customerJobService.DeliveryCustomers(data, req);

                var notification = await _notificationService.Create(idUser, req.IDAccountEmployee, 6);

                var response = new Response()
                {
                    Status = true,
                    Message = "Bạn đã giao khách hàng thành công",
                    Data = null,
                };

                return Ok(response);
            }
            catch (Exception e)
            {
                if (e is ErrorException errorException)
                {
                    throw errorException;
                }
                else
                {
                    throw new ErrorException((int)HttpStatusCode.InternalServerError, "Internal server error", "Lỗi giao khách hàng trên hệ thống!");
                }
            }
        }*/

        /**
        * Method -> Url: [PUT] -> https://localhost:portnumber/api/v2/customer/undelivery
        * Description: Người dùng thực hiện huỷ giao khách hàng trên hệ thống
        */
        /*[Authorize]
        [HttpPut]
        [Route("undelivery")]
        public async Task<IActionResult> UndeliveryCustomers([FromBody] UndeliveryCustomerRequest req)
        {
            try
            {
                var data = await _customerJobService.GetCustomersByIdArray(req.IdCustomers);

                if (data == null)
                {
                    throw new ErrorException((int)HttpStatusCode.NotFound, "Not found", "Lỗi huỷ giao khách hàng trên hệ thống!");
                }

                await _customerJobService.UndeliveryCustomers(data, req);

                var response = new Response()
                {
                    Status = true,
                    Message = "Bạn đã huỷ giao khách hàng thành công",
                    Data = null,
                };

                return Ok(response);
            }
            catch (Exception e)
            {
                if (e is ErrorException errorException)
                {
                    throw errorException;
                }
                else
                {
                    throw new ErrorException((int)HttpStatusCode.InternalServerError, "Internal server error", "Lỗi huỷ giao khách hàng trên hệ thống!");
                }
            }
        }*/

        /**
        * Method -> Url: [PUT] -> https://localhost:portnumber/api/v2/customer/accept
        * Description: Người dùng thực hiện nhận khách hàng trên hệ thống
        */
        /*[Authorize]
        [HttpPut]
        [Route("accept")]
        public async Task<IActionResult> AcceptCustomers([FromBody] AcceptCustomerRequest req)
        {
            try
            {
                var data = await _customerJobService.GetCustomersByIdArray(req.IdCustomers);

                if (data == null)
                {
                    throw new ErrorException((int)HttpStatusCode.NotFound, "Not found", "Lỗi nhận khách hàng trên hệ thống!");
                }

                if (data.Count(x => x.IdnhanVienSale != req.IDEmployee) > 0)
                {
                    throw new ErrorException((int)HttpStatusCode.BadRequest, "Bad request", "Lỗi nhận khách hàng trên hệ thống!");
                }

                await _customerJobService.AcceptCustomers(data, req);

                var response = new Response()
                {
                    Status = true,
                    Message = "Bạn đã nhận khách hàng thành công",
                    Data = null,
                };

                return Ok(response);
            }
            catch (Exception e)
            {
                if (e is ErrorException errorException)
                {
                    throw errorException;
                }
                else
                {
                    throw new ErrorException((int)HttpStatusCode.InternalServerError, "Internal server error", "Lỗi nhận khách hàng trên hệ thống!");
                }
            }
        }*/

        /**
        * Method -> Url: [PUT] -> https://localhost:portnumber/api/v2/customer/deny
        * Description: Người dùng thực hiện từ chối khách hàng trên hệ thống
        */
        /*[Authorize]
        [HttpPut]
        [Route("deny")]
        public async Task<IActionResult> DenyCustomers([FromBody] DenyCustomerRequest req)
        {
            try
            {
                var data = await _customerJobService.GetCustomersByIdArray(req.IdCustomers);

                if (data == null)
                {
                    throw new ErrorException((int)HttpStatusCode.NotFound, "Not found", "Lỗi từ chối khách hàng trên hệ thống!");
                }

                if (data.Count(x => x.IdnhanVienSale != req.IDEmployee) > 0)
                {
                    throw new ErrorException((int)HttpStatusCode.BadRequest, "Bad request", "Lỗi từ chối khách hàng trên hệ thống!");
                }

                await _customerJobService.DenyCustomers(data, req);

                var response = new Response()
                {
                    Status = true,
                    Message = "Bạn đã từ chối khách hàng thành công",
                    Data = null,
                };

                return Ok(response);
            }
            catch (Exception e)
            {
                if (e is ErrorException errorException)
                {
                    throw errorException;
                }
                else
                {
                    throw new ErrorException((int)HttpStatusCode.InternalServerError, "Internal server error", "Lỗi từ chối khách hàng trên hệ thống!");
                }
            }
        }*/
    }
}
