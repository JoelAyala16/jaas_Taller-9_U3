using Microsoft.AspNetCore.Mvc;
using PizzeriaAdmin.Models;
using PizzeriaAdmin.Services;

namespace PizzeriaAdmin.Controllers
{
    public class ProductosController : Controller
    {
        private readonly ProductoApiService _api;

        public ProductosController(ProductoApiService api)
        {
            _api = api;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> ListJson()
        {
            var data = await _api.GetProductosAsync();
            return Json(data);
        }

        [HttpGet]
        public async Task<IActionResult> GetProducto(int id)
        {
            var p = await _api.GetProductoAsync(id);
            if (p == null) return NotFound();
            return Json(p);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAjax([FromBody] ProductoViewModel producto)
        {
            var ok = await _api.CrearProductoAsync(producto);
            return Json(new { success = ok });
        }

        [HttpPut]
        public async Task<IActionResult> EditAjax(int id, [FromBody] ProductoViewModel producto)
        {
            var ok = await _api.ActualizarProductoAsync(id, producto);
            return Json(new { success = ok });
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteAjax(int id)
        {
            var ok = await _api.EliminarProductoAsync(id);
            return Json(new { success = ok });
        }
    }
}
