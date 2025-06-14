using Api.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Api.Repositories
{
    public interface ITacheRepository
    {
        Task<IEnumerable<Tache>> GetAllAsync();
        Task<Tache?> GetByIdAsync(int id);
        Task<Tache> CreateAsync(Tache tache);
        Task UpdateAsync(Tache tache);
        Task DeleteAsync(int id);
    }
}
