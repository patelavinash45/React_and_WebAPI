namespace Services
{
    public interface IUserService
    {
        Task<bool> ValidateUser(UserView model);
    }
}
