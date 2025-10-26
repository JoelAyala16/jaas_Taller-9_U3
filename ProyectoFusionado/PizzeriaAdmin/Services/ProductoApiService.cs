using System.Net.Http.Json;
using PizzeriaAdmin.Models;

namespace PizzeriaAdmin.Services
{
    public class ProductoApiService
    {
        private readonly HttpClient _http;
        private readonly string _baseUrl = "https://tu-api.com/api/productos";

        public ProductoApiService(HttpClient http)
        {
            _http = http;
        }

        public async Task<List<ProductoViewModel>> GetProductosAsync()
        {
            var result = await _http.GetFromJsonAsync<List<ProductoViewModel>>(_baseUrl);
            return result ?? new List<ProductoViewModel>();
        }

        public async Task<ProductoViewModel?> GetProductoAsync(int id)
        {
            return await _http.GetFromJsonAsync<ProductoViewModel>($"{_baseUrl}/{id}");
        }

        public async Task<bool> CrearProductoAsync(ProductoViewModel producto)
        {
            var resp = await _http.PostAsJsonAsync(_baseUrl, producto);
            return resp.IsSuccessStatusCode;
        }

        public async Task<bool> ActualizarProductoAsync(int id, ProductoViewModel producto)
        {
            var resp = await _http.PutAsJsonAsync($"{_baseUrl}/{id}", producto);
            return resp.IsSuccessStatusCode;
        }

        public async Task<bool> EliminarProductoAsync(int id)
        {
            var resp = await _http.DeleteAsync($"{_baseUrl}/{id}");
            return resp.IsSuccessStatusCode;
        }
    }
}
