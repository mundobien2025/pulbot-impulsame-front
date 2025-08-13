import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

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

type FormErrors = {
  email?: string;
  ci?: string;
  phone1?: string;
  idFile?: string;
  rifFile?: string;
  ref1IdFile?: string;
  ref2IdFile?: string;
  [key: string]: string | undefined;
};

const relationOptions = [
  { value: 'amigo', label: 'Amigo' },
  { value: 'familiar', label: 'Familiar' },
  { value: 'colega', label: 'Colega' },
  { value: 'vecino', label: 'Vecino' },
  { value: 'otro', label: 'Otro' }
];

const activityOptions = [
  { value: 'dependencia', label: 'Relación de dependencia' },
  { value: 'independiente', label: 'Trabajador independiente' },
  { value: 'negocio', label: 'Negocio propio' }
];

export default function RegistrationForm({ onClose }: { onClose: () => void }) {
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

  const [errors, setErrors] = useState<FormErrors>({});

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateCI = (ci: string): boolean => {
    return /^[VE]-\d{7,8}$/i.test(ci);
  };

  const validatePhone = (phone: string): boolean => {
    return /^(\+58|0)([0-9]{10})$/.test(phone);
  };

  const handleFileChange = (field: keyof FormData) => (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        setErrors({ ...errors, [field]: 'El archivo excede 10MB' });
        return;
      }
      setFormData({ ...formData, [field]: file });
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: FormErrors = {};

    // Validaciones
    if (!formData.email.trim()) newErrors.email = 'Requerido';
    else if (!validateEmail(formData.email)) newErrors.email = 'Correo inválido';
    
    if (!formData.ci.trim()) newErrors.ci = 'Requerido';
    else if (!validateCI(formData.ci)) newErrors.ci = 'Formato: V-12345678';
    
    if (!formData.phone1.trim()) newErrors.phone1 = 'Requerido';
    else if (!validatePhone(formData.phone1)) newErrors.phone1 = 'Formato: 04141234567 o +584141234567';
    
    if (!formData.idFile) newErrors.idFile = 'Requerido';
    if (!formData.rifFile) newErrors.rifFile = 'Requerido';
    if (!formData.ref1IdFile) newErrors.ref1IdFile = 'Requerido';
    if (!formData.ref2IdFile) newErrors.ref2IdFile = 'Requerido';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Datos válidos:', formData);
      // Aquí iría el envío al backend
      onClose();
    }
  };

  return (
    <div className="form-overlay">
      <div className="registration-form">
        <h2>Registro de Cliente</h2>
        <button className="close-btn" onClick={onClose}>×</button>

        <form onSubmit={handleSubmit}>
          {/* Información Personal */}
          <fieldset>
            <legend>Datos Personales</legend>
            
            <div className="form-group">
              <label>Correo Electrónico: *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="ejemplo@gmail.com"
                className={errors.email ? 'input-error' : ''}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label>Nombre y Apellido: *</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                placeholder="Juan Pérez"
                required
              />
            </div>

            <div className="form-group">
              <label>Fecha de Nacimiento: *</label>
              <input
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>Cédula Venezolana: *</label>
              <input
                type="text"
                value={formData.ci}
                onChange={(e) => setFormData({...formData, ci: e.target.value})}
                placeholder="V-12345678"
                className={errors.ci ? 'input-error' : ''}
                required
              />
              {errors.ci && <span className="error">{errors.ci}</span>}
            </div>
          </fieldset>

          {/* Contacto */}
          <fieldset>
            <legend>Información de Contacto</legend>
            
            <div className="form-group">
              <label>Teléfono Principal: *</label>
              <input
                type="tel"
                value={formData.phone1}
                onChange={(e) => setFormData({...formData, phone1: e.target.value})}
                placeholder="04141234567"
                className={errors.phone1 ? 'input-error' : ''}
                required
              />
              {errors.phone1 && <span className="error">{errors.phone1}</span>}
            </div>

            <div className="form-group">
              <label>Teléfono Secundario:</label>
              <input
                type="tel"
                value={formData.phone2}
                onChange={(e) => setFormData({...formData, phone2: e.target.value})}
                placeholder="04241234567"
              />
            </div>

            <div className="form-group">
              <label>Dirección Completa: *</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                placeholder="Av. Principal, Casa #123"
                required
              />
            </div>
          </fieldset>

          {/* Redes Sociales */}
          <fieldset>
            <legend>Redes Sociales (Opcional)</legend>
            
            <div className="form-group">
              <label>Instagram:</label>
              <input
                type="text"
                value={formData.instagram}
                onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                placeholder="@usuario"
              />
            </div>

            <div className="form-group">
              <label>Facebook:</label>
              <input
                type="text"
                value={formData.facebook}
                onChange={(e) => setFormData({...formData, facebook: e.target.value})}
                placeholder="nombre.usuario"
              />
            </div>

            <div className="form-group">
              <label>TikTok:</label>
              <input
                type="text"
                value={formData.tiktok}
                onChange={(e) => setFormData({...formData, tiktok: e.target.value})}
                placeholder="@usuario"
              />
            </div>
          </fieldset>

          {/* Referencias Personales */}
          <fieldset>
            <legend>Referencias Personales</legend>
            
            <div className="form-group">
              <label>Referencia 1 - Nombre: *</label>
              <input
                type="text"
                value={formData.ref1Name}
                onChange={(e) => setFormData({...formData, ref1Name: e.target.value})}
                placeholder="María González"
                required
              />
            </div>

            <div className="form-group">
              <label>Referencia 1 - Parentesco: *</label>
              <select
                value={formData.ref1Relation}
                onChange={(e) => setFormData({...formData, ref1Relation: e.target.value})}
                required
              >
                <option value="">Seleccione...</option>
                {relationOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Cédula Referencia 1: *</label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange('ref1IdFile')}
                className={errors.ref1IdFile ? 'input-error' : ''}
                required
              />
              <p className="file-hint">PDF, JPG o PNG (max 10MB)</p>
              {errors.ref1IdFile && <span className="error">{errors.ref1IdFile}</span>}
            </div>

            <div className="form-group">
              <label>Referencia 2 - Nombre: *</label>
              <input
                type="text"
                value={formData.ref2Name}
                onChange={(e) => setFormData({...formData, ref2Name: e.target.value})}
                placeholder="Carlos Pérez"
                required
              />
            </div>

            <div className="form-group">
              <label>Referencia 2 - Parentesco: *</label>
              <select
                value={formData.ref2Relation}
                onChange={(e) => setFormData({...formData, ref2Relation: e.target.value})}
                required
              >
                <option value="">Seleccione...</option>
                {relationOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Cédula Referencia 2: *</label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange('ref2IdFile')}
                className={errors.ref2IdFile ? 'input-error' : ''}
                required
              />
              <p className="file-hint">PDF, JPG o PNG (max 10MB)</p>
              {errors.ref2IdFile && <span className="error">{errors.ref2IdFile}</span>}
            </div>
          </fieldset>

          {/* Información Laboral */}
          <fieldset>
            <legend>Información Laboral</legend>
            
            <div className="form-group">
              <label>Ingreso Mensual (USD): *</label>
              <input
                type="number"
                value={formData.monthlyIncome}
                onChange={(e) => setFormData({...formData, monthlyIncome: e.target.value})}
                placeholder="500"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label>Tipo de Actividad: *</label>
              <select
                value={formData.activityType}
                onChange={(e) => setFormData({...formData, activityType: e.target.value})}
                required
              >
                <option value="">Seleccione...</option>
                {activityOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Cargo/Posición: *</label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => setFormData({...formData, position: e.target.value})}
                placeholder="Gerente de Ventas"
                required
              />
            </div>
          </fieldset>

          {/* Documentos */}
          <fieldset>
            <legend>Documentos Requeridos</legend>
            
            <div className="form-group">
              <label>Cédula Laminada: *</label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange('idFile')}
                className={errors.idFile ? 'input-error' : ''}
                required
              />
              <p className="file-hint">PDF, JPG o PNG (max 10MB)</p>
              {errors.idFile && <span className="error">{errors.idFile}</span>}
            </div>

            <div className="form-group">
              <label>RIF: *</label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange('rifFile')}
                className={errors.rifFile ? 'input-error' : ''}
                required
              />
              <p className="file-hint">PDF, JPG o PNG (max 10MB)</p>
              {errors.rifFile && <span className="error">{errors.rifFile}</span>}
            </div>

            <div className="form-group">
              <label>Constancia Laboral:</label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange('workCertFile')}
              />
              <p className="file-hint">PDF, JPG o PNG (max 10MB)</p>
            </div>
          </fieldset>

          <div className="form-actions">
            <button type="submit" className="submit-btn">Enviar Registro</button>
          </div>
        </form>
      </div>
    </div>
  );
}
