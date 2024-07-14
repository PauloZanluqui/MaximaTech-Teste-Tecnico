using Microsoft.EntityFrameworkCore;
using api.Context;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseUrls();

// Add services to the container.
builder.Services.AddDbContext<DesafioContext>(options => 
    options.UseNpgsql(builder.Configuration.GetConnectionString("ConexaoPadrao"))
);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(builder =>
{
    builder.AddPolicy("AllowAll", options =>
    {
        options.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
var context = scope.ServiceProvider.GetRequiredService<DesafioContext>();
DbInitializer.Initialize(context);
}

app.Run();
