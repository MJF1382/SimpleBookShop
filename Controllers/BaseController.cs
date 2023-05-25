using Microsoft.AspNetCore.Mvc;

namespace SimpleBookShop.Controllers
{
    public class BaseController : Controller
    {
        public const string Server_Error = "خطا در اتصال به سرور، لطفا بعدا دوباره امتحان کنید.";
        public const string NotFound_Error = "آیتم مورد نظر یافت نشد.";
    }
}
