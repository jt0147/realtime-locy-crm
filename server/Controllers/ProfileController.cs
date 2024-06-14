using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Text.Json;
using VslCrmApiRealTime.Exceptions;
using VslCrmApiRealTime.Interfaces;
using VslCrmApiRealTime.Models.DTOs.Profile;
using VslCrmApiRealTime.Models.Responses;

namespace VslCrmApiRealTime.Controllers
{
    /*
    * URL: https://localhost:portnumber/api/v2/profile
    */
    [Route("/api/v2/[controller]")]
    [ApiController]
    [Authorize]
    public class ProfileController : Controller
    {
        private readonly IProfileService _profileService;
        private readonly TimeSpan _cachedTime = TimeSpan.FromMinutes(10);
        private readonly ICacheService _cacheService;

        public ProfileController(IProfileService profileService, ICacheService cacheService)
        {
            _profileService = profileService;
            _cacheService = cacheService;
        }

        /**
        * Method -> Url: [GET] -> https://localhost:portnumber/api/v2/profile/{id}
        * Description: Người dùng thực hiện lấy dữ liệu người dùng trên hệ thống
        */
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetProfileById([FromRoute] long id)
        {
            try
            {
                var key = $"profile_{id}";
                var cachedData = _cacheService.GetValue(key);
                ProfileDto? data = null;

                if (cachedData == null)
                {
                    data = await _profileService.GetProfileById(id);

                    // Check if data not exist
                    if (data == null)
                    {
                        throw new ErrorException((int)HttpStatusCode.NotFound, "Not found", "Người dùng không tồn tại!");
                    }

                    // Serialize data before caching
                    var serializedData = JsonSerializer.Serialize(data);
                    _cacheService.SetValue(key, serializedData, _cachedTime);
                }
                else
                {
                    data = JsonSerializer.Deserialize<ProfileDto>(cachedData);
                }

                var response = new Response()
                {
                    Status = true,
                    Message = "Lấy dữ liệu người dùng thành công!",
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
                    throw new ErrorException((int)HttpStatusCode.InternalServerError, "Internal server error", "Lỗi lấy dữ liệu người dùng!");
                }
            }
        }
    }
}
