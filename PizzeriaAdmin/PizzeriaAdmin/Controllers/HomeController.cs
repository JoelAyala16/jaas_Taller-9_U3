using Microsoft.AspNetCore.Mvc;

namespace PizzeriaAdmin.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
