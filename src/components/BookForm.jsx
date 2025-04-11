import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Save } from 'lucide-react';

const BookForm = ({
  formData,
  setFormData,
  handleSubmit,
  isEdit = false,
  isSubmitting = false,
}) => {
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvaliationChange = (rating) => {
    setFormData((prev) => ({ ...prev, avaliation: rating }));
  };

  const clearEndDate = () => {
    setFormData((prev) => ({ ...prev, endDate: '' }));
  };

  const clearAvaliation = () => {
    setFormData((prev) => ({ ...prev, avaliation: 0 }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Autor</label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Data de início</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-gray-700">Data de término</label>
            {formData.endDate && (
              <button
                type="button"
                onClick={clearEndDate}
                className="text-xs text-red-600 hover:underline"
              >
                Zerar
              </button>
            )}
          </div>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Status da leitura</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="">Selecione...</option>
          <option value="lido">Lido</option>
          <option value="lendo">Lendo</option>
          <option value="quero ler">Quero ler</option>
        </select>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-sm font-medium text-gray-700">Avaliação</label>
          {formData.avaliation > 0 && (
            <button
              type="button"
              onClick={clearAvaliation}
              className="text-xs text-red-600 hover:underline"
            >
              Zerar
            </button>
          )}
        </div>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              onClick={() => handleAvaliationChange(star)}
              disabled={isSubmitting}
              className={`text-2xl ${
                star <= formData.avaliation ? 'text-yellow-400' : 'text-gray-300'
              } hover:scale-110 transition`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => navigate(-1)}
          disabled={isSubmitting}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-6 py-2 rounded-lg"
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`${
            isSubmitting ? 'flex items-center bg-blue-400' : 'flex items-center bg-blue-600 hover:bg-blue-700'
          } text-white font-medium px-6 py-2 rounded-lg transition`}
        ><Save className="w-4 mr-2" />
          {isSubmitting ? 'Salvando...' : isEdit ? 'Salvar alterações' : 'Salvar'}
        </button>
      </div>
    </form>
  );
};

export default BookForm;
