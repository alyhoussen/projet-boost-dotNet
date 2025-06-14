using Api.Models;
using Api.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TachesController : ControllerBase
    {
        private readonly TacheService _service;

        public TachesController(TacheService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() =>
            Ok(await _service.GetAllAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var tache = await _service.GetByIdAsync(id);
            return tache == null ? NotFound() : Ok(tache);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Tache tache)
        {
            var created = await _service.CreateAsync(tache);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Tache tache)
        {
            if (id != tache.Id) return BadRequest();
            await _service.UpdateAsync(tache);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return NoContent();
        }
    }
}
