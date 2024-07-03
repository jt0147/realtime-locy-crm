using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml.FormulaParsing.LexicalAnalysis;
using System.Net;
using VslCrmApiRealTime.Exceptions;
using VslCrmApiRealTime.Interfaces;
using VslCrmApiRealTime.Models.Responses;

namespace VslCrmApiRealTime.Controllers
{
    /*
    * URL: https://localhost:portnumber/api/v2/auth
    */
    [Route("/api/v2/[controller]")]
    [ApiController]
    [Authorize]
    public class DashboardController : Controller
    {
        private readonly IDashboardService _dashboardService;

        public DashboardController(IDashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }

        /**
        * Method -> Url: [GET] -> https://localhost:portnumber/api/v2/dashboard
        * Description: Người dùng thực hiện lấy dữ liệu dashboard
        */
        [HttpGet]
        public async Task<IActionResult> GetData()
        {
            try
            {
                var data = await _dashboardService.GetData();

                var response = new Response()
                {
                    Status = true,
                    Message = "Lấy dữ liệu dashboard thành công!",
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
                    throw new ErrorException((int)HttpStatusCode.InternalServerError, "Internal server error", "Lỗi lấy dữ liệu dashboard!");
                }
            }
        }

        /**
        * Method -> Url: [GET] -> https://localhost:portnumber/api/v2/dashboard/employee-office/{id}
        * Description: Người dùng thực hiện lấy dữ liệu nhân viên từng văn phòng
        */
        [HttpGet]
        [Route("employee-office/{id}")]
        public async Task<IActionResult> GetEmployeeData([FromRoute] long id)
        {
            try
            {
                var data = await _dashboardService.GetEmployeeData(id);

                var response = new Response()
                {
                    Status = true,
                    Message = "Lấy dữ liệu nhân viên từng văn phòng thành công!",
                    Data = data,
                };

                return Ok(response);
            } catch (Exception e)
            {
                if (e is ErrorException errorException)
                {
                    throw errorException;
                }
                else
                {
                    throw new ErrorException((int)HttpStatusCode.InternalServerError, "Internal server error", "Lỗi lấy dữ liệu nhân viên từng văn phòng!");
                }
            }
        }
    }
}
