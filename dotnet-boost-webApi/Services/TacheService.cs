using Api.Models;
using Api.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Api.Services
{
    public class TacheService
    {
        private readonly ITacheRepository _repository;

        public TacheService(ITacheRepository repository)
        {
            _repository = repository;
        }

        public Task<IEnumerable<Tache>> GetAllAsync() =>
            _repository.GetAllAsync();

        public Task<Tache?> GetByIdAsync(int id) =>
            _repository.GetByIdAsync(id);

        public Task<Tache> CreateAsync(Tache tache) =>
            _repository.CreateAsync(tache);

        public Task UpdateAsync(Tache tache) =>
            _repository.UpdateAsync(tache);

        public Task DeleteAsync(int id) =>
            _repository.DeleteAsync(id);
    }
}
