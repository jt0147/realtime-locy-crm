using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using VslCrmApiRealTime.Backgrounds;
using VslCrmApiRealTime.Data;
using VslCrmApiRealTime.Hubs;
using VslCrmApiRealTime.Interfaces;
using VslCrmApiRealTime.Middlewares;
using VslCrmApiRealTime.Services;

var builder = WebApplication.CreateBuilder(args);
var vslCors = "_vslApiOriginCor";

var origin = new[] { builder.Configuration["Origin"] ?? "", "http://localhost:5173" };
var sqlConnectionString = builder.Configuration.GetConnectionString("DefaultConnection");
var jwtSection = builder.Configuration.GetSection("Jwt");
var jwtKey = jwtSection["Key"] ?? "";
var jwtIssuer = jwtSection["Issuer"];
var jwtAudience = jwtSection["Audience"];

// Add services to the container.

// Add cors
builder.Services.AddCors(option =>
{
    option.AddPolicy(name: vslCors, policy =>
    {
        policy.WithOrigins(origin).AllowAnyHeader().AllowAnyMethod().AllowCredentials();
    });
});

// Add authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidIssuer = jwtIssuer,
        ValidAudience = jwtAudience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
    };
});

// Clear default logging providers and add console logging
builder.Logging.ClearProviders();
builder.Logging.AddConsole();

// Add in-memory caching
builder.Services.AddMemoryCache();

// Add db context
builder.Services.AddDbContext<VslCrmContext>(options => options.UseSqlServer(sqlConnectionString));

// Add realtime with SignalR
builder.Services.AddSignalR();

// Add controller
builder.Services.AddControllers();

// Add service with interface
builder.Services.AddScoped<IJobSchedulerService, JobSchedulerService>();
builder.Services.AddScoped<ICacheService, CacheService>();
builder.Services.AddScoped<IEmailService, EmailService>();

builder.Services.AddScoped<ISysOptionService, SysOptionService>();

builder.Services.AddScoped<IAuthService<TblSysUser>, AuthService>();
builder.Services.AddScoped<IProfileService, ProfileService>();

// Add background service
builder.Services.AddHostedService<JobSchedulerBackground>();

// Add global error handling
builder.Services.AddTransient<ErrorHandleMiddleware>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(vslCors);

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.UseMiddleware<ErrorHandleMiddleware>();

app.UseRouting();

app.MapHub<JobHub>("/api/v2/job");

app.MapControllers();

app.Run();
