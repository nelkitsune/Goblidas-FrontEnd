import React, { useState } from 'react';
import './ModalAgregarDireccionEstilo.css';

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
        number: '', // Cambiado a string vacío
        streetName: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('submit'); // <-- Agrega esto
        onSave({
            ...form,
            number: Number(form.number)
        });
    };

    return (
        <div className="modal-overlay">
            <form className="modal-content" onSubmit={handleSubmit}>
                <h3>Agregar nueva dirección</h3>
                <input name="departament" placeholder="Departamento" value={form.departament} onChange={handleChange} required />
                <input name="locality" placeholder="Localidad" value={form.locality} onChange={handleChange} required />
                <input name="country" placeholder="País" value={form.country} onChange={handleChange} required />
                <input name="province" placeholder="Provincia" value={form.province} onChange={handleChange} required />
                <input name="number" type="number" placeholder="Número" value={form.number} onChange={handleChange} required />
                <input name="streetName" placeholder="Calle" value={form.streetName} onChange={handleChange} required />
                <button type="submit" >Guardar</button>
                <button type="button" onClick={onClose}>Cancelar</button>
            </form>
        </div>
    );
};