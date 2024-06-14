using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using VslCrmApiRealTime.Exceptions;
using VslCrmApiRealTime.Interfaces;
using VslCrmApiRealTime.Models.Requests.Sys;
using VslCrmApiRealTime.Models.Responses;

namespace VslCrmApiRealTime.Controllers
{
    /*
    * URL: https://localhost:portnumber/api/v2/sys
    */
    [Route("/api/v2/[controller]")]
    [ApiController]
    [Authorize]
    public class SysController : Controller
    {
        private readonly ISysOptionService _sysOptionService;

        public SysController(ISysOptionService sysOptionService)
        {
            _sysOptionService = sysOptionService;
        }

        /**
        * Method -> Url: [GET] -> https://localhost:portnumber/api/v2/sys
        * Description: Người dùng thực hiện lấy dữ liệu cài đặt mặt định hệ thống
        */
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var data = await _sysOptionService.GetData();

                var response = new Response()
                {
                    Status = true,
                    Message = "Lấy dữ liệu về cài đặt hệ thống!",
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
                    throw new ErrorException((int)HttpStatusCode.InternalServerError, "Internal server error", "Lỗi lấy dữ liệu về cài đặt hệ thống!");
                }
            }
        }

        /**
        * Method -> Url: [PUT] -> https://localhost:portnumber/api/v2/sys
        * Description: Người dùng thực hiện lấy dữ liệu cài đặt mặt định hệ thống
        */
        [HttpPut]
        public async Task<IActionResult> Update([FromBody] UpdateSysOptionRequest req)
        {
            try
            {
                await _sysOptionService.Update(req);

                var response = new Response()
                {
                    Status = true,
                    Message = "Cập nhật dữ liệu về cài đặt hệ thống!",
                    Data = null
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
                    throw new ErrorException((int)HttpStatusCode.InternalServerError, "Internal server error", "Lỗi cập nhật dữ liệu về cài đặt hệ thống!");
                }
            }
        }
    }
}
