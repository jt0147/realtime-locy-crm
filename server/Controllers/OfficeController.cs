﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using VslCrmApiRealTime.Exceptions;
using VslCrmApiRealTime.Interfaces;
using VslCrmApiRealTime.Models.Requests.Category;
using VslCrmApiRealTime.Models.Responses;

namespace VslCrmApiRealTime.Controllers
{
    /*
    * URL: https://localhost:portnumber/api/v2/office
    */
    [Route("/api/v2/[controller]")]
    [ApiController]
    public class OfficeController : Controller
    {
        private readonly ICategoryService _categoryService;

        public OfficeController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }


        /**
        * Method -> Url: [GET] -> https://localhost:portnumber/api/v2/office/all
        * Description: Lấy dữ liệu về tất cả văn phòng trong cơ sở dữ liệu
        */
        [Authorize]
        [HttpGet]
        [Route("all")]
        public async Task<IActionResult> GetAllOffices()
        {
            try
            {
                var data = await _categoryService.GetAllOffices();

                var response = new Response()
                {
                    Status = true,
                    Message = "Lấy dữ liệu về tất cả văn phòng thành công!",
                    Data = data,
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
                    throw new ErrorException((int)HttpStatusCode.InternalServerError, "Internal server error", "Lỗi lấy dữ liệu về tất cả văn phòng!");
                }
            }
        }

        /**
        * Method -> Url: [GET] -> https://localhost:portnumber/api/v2/office
        * Description: Lấy dữ liệu về văn phòng trong cơ sở dữ liệu
        */
        [Authorize("ManageCategory")]
        [HttpGet]
        public async Task<IActionResult> GetOffices([FromQuery(Name = "start")] int Start = 0, [FromQuery(Name = "size")] int Size = 10, [FromQuery(Name = "search")] string Search = "")
        {
            try
            {
                var search = Search.ToLower().Trim();
                var data = await _categoryService.GetOffices(Start, Size, search);
                var total = await _categoryService.GetTotalOffices(search);

                var response = new Response()
                {
                    Status = true,
                    Message = "Lấy dữ liệu văn phòng thành công!",
                    Data = new
                    {
                        data = data,
                        totalRow = total,
                    }
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
                    throw new ErrorException((int)HttpStatusCode.InternalServerError, "Internal server error", "Lỗi lấy dữ liệu văn phòng!");
                }
            }
        }

        /**
        * Method -> Url: [POST] -> https://localhost:portnumber/api/v2/office
        * Description: Tạo mới dữ liệu văn phòng trong cơ sở dữ liệu
        */
        [Authorize("ManageCategory")]
        [HttpPost]
        public async Task<IActionResult> CreateOffice([FromBody] CreateOfficeRequest req)
        {
            try
            {
                var isExistCode = await _categoryService.IsCodeOfficeExist(req.Code);
                var isExistTaxCode = await _categoryService.IsTaxCodeOfficeExist(req.TaxCode ?? "");

                if (isExistCode)
                {
                    throw new ErrorException((int)HttpStatusCode.Conflict, "Conflict data", "Mã văn phòng đã tồn tại!");
                }

                if (isExistTaxCode)
                {
                    throw new ErrorException((int)HttpStatusCode.Conflict, "Conflict data", "Mã số thuế văn phòng đã tồn tại!");
                }

                await _categoryService.CreateOffice(req);

                var response = new Response()
                {
                    Status = true,
                    Message = "Tạo dữ liệu văn phòng thành công!",
                    Data = null,
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
                    throw new ErrorException((int)HttpStatusCode.InternalServerError, "Internal server error", "Lỗi tạo dữ liệu văn phòng trên hệ thống!");
                }
            }
        }

        /**
        * Method -> Url: [PUT] -> https://localhost:portnumber/api/v2/office/{id}
        * Description: Cập nhật dữ liệu văn phòng trong cơ sở dữ liệu
        */
        [Authorize("ManageCategory")]
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateOffice([FromRoute] long id, [FromBody] UpdateOfficeRequest req)
        {
            try
            {
                if (id != req.Id)
                {
                    throw new ErrorException((int)HttpStatusCode.BadRequest, "Bad request", "Lỗi cập nhật dữ liệu văn phòng trên hệ thống!");
                }

                var data = await _categoryService.GetOfficeById(id);

                if (data == null)
                {
                    throw new ErrorException((int)HttpStatusCode.NotFound, "Not found", "Lỗi cập nhật dữ liệu văn phòng trên hệ thống vì dữ liệu không tồn tại trên hệ thống!");
                }

                if(data.Code?.ToLower() != req.Code?.ToLower())
                {
                    var isExistCode = await _categoryService.IsCodeOfficeExist(req.Code ?? "");

                    if (isExistCode)
                    {
                        throw new ErrorException((int)HttpStatusCode.Conflict, "Conflict data", "Mã văn phòng đã tồn tại!");
                    }
                }

                if (data.TaxCode?.ToLower() != req.TaxCode?.ToLower())
                {
                    var isExistTaxCode = await _categoryService.IsTaxCodeOfficeExist(req.TaxCode ?? "");

                    if (isExistTaxCode)
                    {
                        throw new ErrorException((int)HttpStatusCode.Conflict, "Conflict data", "Mã số thuế văn phòng đã tồn tại!");
                    }
                }

                if (data != null)
                {
                    await _categoryService.UpdateOffice(data, req);
                }

                var response = new Response()
                {
                    Status = true,
                    Message = "Bạn đã cập nhật dữ liệu văn phòng thành công trên hệ thống!",
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
                    throw new ErrorException((int)HttpStatusCode.InternalServerError, "Internal server error", "Lỗi cập nhật dữ liệu văn phòng trên hệ thống!");
                }
            }
        }

        /**
        * Method -> Url: [DELETE] -> https://localhost:portnumber/api/v2/office/{id}
        * Description: Xoá dữ liệu văn phòng trong cơ sở dữ liệu
        */
        [Authorize("ManageCategory")]
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteOffice([FromRoute] long id)
        {
            try
            {
                var data = await _categoryService.GetOfficeById(id);

                if (data == null)
                {
                    throw new ErrorException((int)HttpStatusCode.NotFound, "Not found", "Lỗi xoá dữ liệu văn phòng trên hệ thống vì dữ liệu không tồn tại trên hệ thống!");
                }

                await _categoryService.DeleteOffice(data);

                var response = new Response()
                {
                    Status = true,
                    Message = "Xoá dữ liệu văn phòng thành công!",
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
                    throw new ErrorException((int)HttpStatusCode.InternalServerError, "Internal server error", "Lỗi xoá dữ liệu văn phòng trên hệ thống!");
                }
            }
        }
    }
}
