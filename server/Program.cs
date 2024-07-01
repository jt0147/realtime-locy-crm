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

builder.Services.AddScoped<ICategoryService, CategoryService>();

builder.Services.AddScoped<IEmployeeService, EmployeeService>();
builder.Services.AddScoped<IEmployeeGroupService, EmployeeGroupService>();

builder.Services.AddScoped<ICustomerService, CustomerService>();
builder.Services.AddScoped<ICustomerJobService, CustomerJobService>();
builder.Services.AddScoped<ICustomerInfoService, CustomerInfoService>();

builder.Services.AddScoped<IReportService, ReportService>();

builder.Services.AddScoped<INotificationService, NotificationService>();

// Add authorization role
builder.Services.AddAuthorization(option =>
{
    option.AddPolicy("ManageEmployee", policy => policy.RequireAssertion(context =>
        context.User.HasClaim(claim => claim.Type == "Permission" && (claim.Value.Contains("1048576") || claim.Value.Contains("5000")))
    ));
    option.AddPolicy("ManageCategory", policy => policy.RequireAssertion(context =>
        context.User.HasClaim(claim => claim.Type == "Permission" && (claim.Value.Contains("1048576") || claim.Value.Contains("6000")))
    ));
    option.AddPolicy("ManageCustomer", policy => policy.RequireAssertion(context =>
        context.User.HasClaim(claim => claim.Type == "Permission" && (claim.Value.Contains("1048576") || claim.Value.Contains("7000") || claim.Value.Contains("7020")))
    ));
    option.AddPolicy("DeliveryCustomer", policy => policy.RequireAssertion(context =>
        context.User.HasClaim(claim => claim.Type == "Permission" && (claim.Value.Contains("1048576") || claim.Value.Contains("7000") || claim.Value.Contains("7080")))
    ));
    option.AddPolicy("ImportCustomer", policy => policy.RequireAssertion(context =>
        context.User.HasClaim(claim => claim.Type == "Permission" && (claim.Value.Contains("1048576") || claim.Value.Contains("7000") || claim.Value.Contains("7040")))
    ));
    option.AddPolicy("ExportCustomer", policy => policy.RequireAssertion(context =>
        context.User.HasClaim(claim => claim.Type == "Permission" && (claim.Value.Contains("1048576") || claim.Value.Contains("7000") || claim.Value.Contains("7060")))
    ));
});

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

app.MapHub<JobHub>("/api/v2/job");

app.MapControllers();

app.Run();
