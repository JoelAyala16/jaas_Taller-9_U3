using Microsoft.AspNetCore.Mvc;
using PizzeriaAdmin.Models;
using PizzeriaAdmin.Services;

namespace PizzeriaAdmin.Controllers
{
    public class CategoriasController : Controller
    {
        private readonly CategoriaApiService _api;

        public CategoriasController(CategoriaApiService api)
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
            var data = await _api.GetCategoriasAsync();
            return Json(data);
        }

        [HttpGet]
        public async Task<IActionResult> GetCategoria(int id)
        {
            var cat = await _api.GetCategoriaAsync(id);
            if (cat == null) return NotFound();
            return Json(cat);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAjax([FromBody] CategoriaViewModel categoria)
        {
            var ok = await _api.CrearCategoriaAsync(categoria);
            return Json(new { success = ok });
        }

        [HttpPut]
        public async Task<IActionResult> EditAjax(int id, [FromBody] CategoriaViewModel categoria)
        {
            var ok = await _api.ActualizarCategoriaAsync(id, categoria);
            return Json(new { success = ok });
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteAjax(int id)
        {
            var ok = await _api.EliminarCategoriaAsync(id);
            return Json(new { success = ok });
        }

        [HttpGet]
        public async Task<IActionResult> ListForSelect()
        {
            var data = await _api.GetCategoriasAsync();
            var slim = data.Select(c => new { c.Id, c.Nombre }).ToList();
            return Json(slim);
        }
    }
}
