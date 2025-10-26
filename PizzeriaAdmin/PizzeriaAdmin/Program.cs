using PizzeriaAdmin.Services;

var builder = WebApplication.CreateBuilder(args);

// MVC
builder.Services.AddControllersWithViews()
    .AddRazorRuntimeCompilation();

// HttpClients para hablar con la API externa
builder.Services.AddHttpClient<ProductoApiService>();
builder.Services.AddHttpClient<CategoriaApiService>();

var app = builder.Build();

// Middleware estándar
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
}
app.UseStaticFiles();
app.UseRouting();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
