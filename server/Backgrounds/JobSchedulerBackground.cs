using VslCrmApiRealTime.Interfaces;

namespace VslCrmApiRealTime.Backgrounds
{
    public class JobSchedulerBackground : BackgroundService
    {
        private readonly IServiceScopeFactory _serviceScopeFactory;

        public JobSchedulerBackground(IServiceScopeFactory serviceScopeFactory)
        {
            _serviceScopeFactory = serviceScopeFactory;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                using (var scope = _serviceScopeFactory.CreateScope())
                {
                    var serviceProvider = scope.ServiceProvider;
                    var jobSchedulerService = serviceProvider.GetRequiredService<IJobSchedulerService>();

                    // Call the method to check and update jobs
                    await jobSchedulerService.CheckAndUpdateCustomerJobs();
                }

                // Wait for a specified interval before checking again
                await Task.Delay(TimeSpan.FromHours(1), stoppingToken); // Example: Check every 1 hours
            }
        }
    }
}
