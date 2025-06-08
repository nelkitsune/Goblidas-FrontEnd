import React, { useState } from 'react';

interface Props {
    onClose: () => void;
    onSave: (direccion: {
        departament: string;
        locality: string;
        country: string;
        province: string;
        number: number;
        streetName: string;
    }) => void;
}

export const ModalAgregarDireccion: React.FC<Props> = ({ onClose, onSave }) => {
    const [form, setForm] = useState({
        departament: '',
        locality: '',
        country: '',
        province: '',
        number: 0,
        streetName: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: name === 'number' ? Number(value) : value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(form);
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
            <form
                onSubmit={handleSubmit}
                style={{ background: '#fff', padding: 24, borderRadius: 8, minWidth: 320, maxWidth: 400 }}
            >
                <h3>Agregar nueva dirección</h3>
                <input name="departament" placeholder="Departamento" value={form.departament} onChange={handleChange} required style={{ width: '100%', marginBottom: 8 }} />
                <input name="locality" placeholder="Localidad" value={form.locality} onChange={handleChange} required style={{ width: '100%', marginBottom: 8 }} />
                <input name="country" placeholder="País" value={form.country} onChange={handleChange} required style={{ width: '100%', marginBottom: 8 }} />
                <input name="province" placeholder="Provincia" value={form.province} onChange={handleChange} required style={{ width: '100%', marginBottom: 8 }} />
                <input name="number" type="number" placeholder="Número" value={form.number} onChange={handleChange} required style={{ width: '100%', marginBottom: 8 }} />
                <input name="streetName" placeholder="Calle" value={form.streetName} onChange={handleChange} required style={{ width: '100%', marginBottom: 8 }} />
                <button type="submit" style={{ marginTop: 12 }}>Guardar</button>
                <button type="button" onClick={onClose} style={{ marginLeft: 8 }}>Cancelar</button>
            </form>
        </div>
    );
};