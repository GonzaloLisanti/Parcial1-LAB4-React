import { Articulo } from "../types/Articulo";
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

interface Props {
    onSubmit: (articulo: Articulo) => void;
    onCancel: () => void;
    selectedArticulo: Articulo | null;
}

const ArticuloForm: React.FC<Props> = ({ onSubmit, onCancel, selectedArticulo }) => {
    const [formArticulo, setFormArticulo] = useState<Articulo>({
        id: selectedArticulo ? selectedArticulo.id : 0,
        codigo: selectedArticulo ? selectedArticulo.codigo : '',
        denominacion: selectedArticulo ? selectedArticulo.denominacion : '',
        precio: selectedArticulo ? selectedArticulo.precio : 0,
        idrubro: selectedArticulo ? selectedArticulo.idrubro : 0,
    });

    const [rubros, setRubros] = useState<Articulo[]>([]);

    useEffect(() => {
        fetchRubros();
    }, []);

    const fetchRubros = async () => {
        try {
            const response = await fetch('http://168.194.207.98:8081/api_articulo/get_rubros.php');
            const data = await response.json();
            setRubros(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormArticulo({ ...formArticulo, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formArticulo);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formId">
                {selectedArticulo && <Form.Label>Id</Form.Label>}
                {selectedArticulo && (
                    <Form.Control
                        type="text"
                        name="id"
                        value={formArticulo.id}
                        onChange={handleChange}
                        disabled={true}
                    />
                )}
            </Form.Group>
            <Form.Group controlId="formCodigo">
                <Form.Label>Código</Form.Label>
                <Form.Control type="text" name="codigo" value={formArticulo.codigo} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formDenominación">
                <Form.Label>Denominación</Form.Label>
                <Form.Control type="text" name="denominacion" value={formArticulo.denominacion} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formPrecio">
                <Form.Label>Precio</Form.Label>
                <Form.Control type="number" name="precio" value={formArticulo.precio} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formRubro">
                <Form.Label>Rubro</Form.Label>
                <Form.Control as="select" name="idrubro" value={formArticulo.idrubro} onChange={handleChange} required>
                    <option value="">Seleccione un rubro</option>
                    {rubros.map((rubro) => (
                        <option key={rubro.id} value={rubro.id}>{rubro.denominacion}</option>
                    ))}
                </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
                Guardar
            </Button>
            <Button variant="secondary" onClick={onCancel} className="mt-3">
                Cancelar
            </Button>

        </Form>
    )
}
export default ArticuloForm;