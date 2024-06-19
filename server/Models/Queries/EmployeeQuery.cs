namespace VslCrmApiRealTime.Models.Queries
{
    public class EmployeeQuery
    {
        // Pagination
        public int Start { get; set; }
        public int Size { get; set; }

        // Filter
        public string? FullName { get; set; }
        public long? IDPosition { get; set; }
        public long? IDDepartment { get; set; }
        public long? IDOffice { get; set; }

        public required bool Status { get; set; }
    }
}
