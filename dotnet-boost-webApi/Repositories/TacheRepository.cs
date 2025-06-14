using Api.Data;
using Api.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Api.Repositories
{
    public class TacheRepository : ITacheRepository
    {
        private readonly AppDbContext _context;

        public TacheRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Tache>> GetAllAsync() =>
            await _context.Taches.ToListAsync();

        public async Task<Tache?> GetByIdAsync(int id) =>
            await _context.Taches.FindAsync(id);

        public async Task<Tache> CreateAsync(Tache tache)
        {
            _context.Taches.Add(tache);
            await _context.SaveChangesAsync();
            return tache;
        }

        public async Task UpdateAsync(Tache tache)
        {
            _context.Entry(tache).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var tache = await _context.Taches.FindAsync(id);
            if (tache != null)
            {
                _context.Taches.Remove(tache);
                await _context.SaveChangesAsync();
            }
        }
    }
}
