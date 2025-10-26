using System.Net.Http.Json;
using PizzeriaAdmin.Models;

namespace PizzeriaAdmin.Services
{
    public class CategoriaApiService
    {
        private readonly HttpClient _http;
        private readonly string _baseUrl = "https://tu-api.com/api/categorias";

        public CategoriaApiService(HttpClient http)
        {
            _http = http;
        }

        public async Task<List<CategoriaViewModel>> GetCategoriasAsync()
        {
            var result = await _http.GetFromJsonAsync<List<CategoriaViewModel>>(_baseUrl);
            return result ?? new List<CategoriaViewModel>();
        }

        public async Task<CategoriaViewModel?> GetCategoriaAsync(int id)
        {
            return await _http.GetFromJsonAsync<CategoriaViewModel>($"{_baseUrl}/{id}");
        }

        public async Task<bool> CrearCategoriaAsync(CategoriaViewModel categoria)
        {
            var resp = await _http.PostAsJsonAsync(_baseUrl, categoria);
            return resp.IsSuccessStatusCode;
        }

        public async Task<bool> ActualizarCategoriaAsync(int id, CategoriaViewModel categoria)
        {
            var resp = await _http.PutAsJsonAsync($"{_baseUrl}/{id}", categoria);
            return resp.IsSuccessStatusCode;
        }

        public async Task<bool> EliminarCategoriaAsync(int id)
        {
            var resp = await _http.DeleteAsync($"{_baseUrl}/{id}");
            return resp.IsSuccessStatusCode;
        }
    }
}
