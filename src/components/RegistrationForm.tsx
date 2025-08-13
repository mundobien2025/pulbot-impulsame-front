import { useState } from 'react';

type FormData = {
  email: string;
  fullName: string;
  birthDate: string;
  ci: string;
  phone1: string;
  phone2: string;
  address: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  ref1Name: string;
  ref1Relation: string;
  ref2Name: string;
  ref2Relation: string;
  monthlyIncome: string;
  activityType: string;
  position: string;
  idFile: File | null;
  rifFile: File | null;
  ref1IdFile: File | null;
  ref2IdFile: File | null;
  workCertFile: File | null;
};

type Errors = {
  [key: string]: string | undefined;
};

interface RegistrationFormProps {
  onClose: () => void;
}

const RegistrationForm = ({ onClose }: RegistrationFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    fullName: '',
    birthDate: '',
    ci: '',
    phone1: '',
    phone2: '',
    address: '',
    instagram: '',
    facebook: '',
    tiktok: '',
    ref1Name: '',
    ref1Relation: '',
    ref2Name: '',
    ref2Relation: '',
    monthlyIncome: '',
    activityType: '',
    position: '',
    idFile: null,
    rifFile: null,
    ref1IdFile: null,
    ref2IdFile: null,
    workCertFile: null
  });

  const [errors, setErrors] = useState<Errors>({});

  const validateVenezuelanFormat = (value: string, type: 'phone' | 'ci' | 'rif'): boolean => {
    const patterns = {
      phone: /^(\+58|0)([0-9]{10})$/,
      ci: /^[VE]-\d{8}$/i,
      rif: /^[JG]-\d{8}-\d$/i
    };
    return patterns[type].test(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Errors = {};

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Correo inválido';
    }

    if (!validateVenezuelanFormat(formData.ci, 'ci')) {
      newErrors.ci = 'Formato: V-12345678';
    }

    if (!validateVenezuelanFormat(formData.phone1, 'phone')) {
      newErrors.phone1 = 'Formato: 04141234567 o +584141234567';
    }

    if (!formData.idFile) {
      newErrors.idFile = 'Debe subir su cédula laminada';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log('Formulario válido:', formData);
      // Aquí iría el envío a tu backend
    }
  };

  const handleFileChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        setErrors({...errors, [field]: 'El archivo excede 10MB'});
        return;
      }
      setFormData({...formData, [field]: file});
      setErrors({...errors, [field]: undefined});
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
  };

  return (
    <div className="form-overlay">
      <div className="registration-form">
        <h2>Registro de Nuevo Cliente</h2>
        <button className="close-btn" onClick={onClose}>×</button>
        
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="form-group">
            <label>Correo: *</label>
            <input
              type="email"
              name="email"
              placeholder="ejemplo@dominio.com"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          {/* Nombre Completo */}
          <div className="form-group">
            <label>Nombre y Apellido: *</label>
            <input
              type="text"
              name="fullName"
              placeholder="Juan Pérez"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Cédula */}
          <div className="form-group">
            <label>Número de Cédula: *</label>
            <input
              type="text"
              name="ci"
              placeholder="V-12345678"
              value={formData.ci}
              onChange={handleInputChange}
              required
            />
            {errors.ci && <span className="error">{errors.ci}</span>}
          </div>

          {/* Archivo - Cédula Laminada */}
          <div className="form-group">
            <label>Cédula Laminada: *</label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange('idFile')}
              required
            />
            <p className="file-hint">Sube 1 archivo compatible: PDF, document o image. Tamaño máximo: 10 MB.</p>
            {errors.idFile && <span className="error">{errors.idFile}</span>}
          </div>

          {/* Botón de envío */}
          <div className="form-actions">
            <button type="submit" className="submit-btn">Enviar Solicitud</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
