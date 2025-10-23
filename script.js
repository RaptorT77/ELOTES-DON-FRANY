// ============================================
// FUNCIONALIDADES DE FORMULARIOS
// ============================================

/**
 * Enviar pedido
 */
function enviarPedido() {
    const nombre = document.getElementById('nombrePedido').value.trim();
    const telefono = document.getElementById('telefonoPedido').value.trim();
    const producto = document.getElementById('productoPedido').value;
    const cantidad = document.getElementById('cantidadPedido').value;
    const comentarios = document.getElementById('comentariosPedido').value.trim();

    // Validación
    if (!nombre || !telefono || !producto || !cantidad) {
        mostrarAlerta('Por favor completa todos los campos requeridos.', 'warning');
        return;
    }

    // Validar teléfono
    if (!/^\d{7,}$/.test(telefono.replace(/\D/g, ''))) {
        mostrarAlerta('Por favor ingresa un teléfono válido.', 'warning');
        return;
    }

    // Construir mensaje
    const mensaje = `
        *NUEVO PEDIDO - ELOTES DON FRANY*
        
        👤 *Nombre:* ${nombre}
        📱 *Teléfono:* ${telefono}
        🌽 *Producto:* ${producto}
        📦 *Cantidad:* ${cantidad}
        ${comentarios ? `💬 *Comentarios:* ${comentarios}` : ''}
        
        ⏰ Fecha: ${new Date().toLocaleString('es-MX')}
    `;

    // Enviar por WhatsApp
    const numeroWhatsApp = '2222222222'; // Cambiar por número real
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    
    // Alternativa: Enviar por email
    enviarPorEmail(nombre, telefono, producto, cantidad, comentarios, 'pedido');

    // Mostrar confirmación
    mostrarAlerta('¡Pedido enviado correctamente! Nos pondremos en contacto pronto.', 'success');
    
    // Limpiar formulario
    document.getElementById('formPedido').reset();
    
    // Cerrar modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('modalPedido'));
    modal.hide();

    // Abrir WhatsApp (opcional)
    // window.open(urlWhatsApp, '_blank');
}

/**
 * Enviar cotización para evento
 */
function enviarCotizacion() {
    const nombre = document.getElementById('nombreCotizacion').value.trim();
    const telefono = document.getElementById('telefonoCotizacion').value.trim();
    const correo = document.getElementById('correoCotizacion').value.trim();
    const fecha = document.getElementById('fechaEvento').value;
    const cantidadPersonas = document.getElementById('cantidadPersonas').value;
    const tipoEvento = document.getElementById('tipoEvento').value;
    const detalles = document.getElementById('detallesCotizacion').value.trim();

    // Validación
    if (!nombre || !telefono || !correo || !fecha || !cantidadPersonas || !tipoEvento) {
        mostrarAlerta('Por favor completa todos los campos requeridos.', 'warning');
        return;
    }

    // Validar email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
        mostrarAlerta('Por favor ingresa un correo válido.', 'warning');
        return;
    }

    // Validar teléfono
    if (!/^\d{7,}$/.test(telefono.replace(/\D/g, ''))) {
        mostrarAlerta('Por favor ingresa un teléfono válido.', 'warning');
        return;
    }

    // Construir mensaje
    const mensaje = `
        *SOLICITUD DE COTIZACIÓN - ELOTES DON FRANY*
        
        👤 *Nombre:* ${nombre}
        📱 *Teléfono:* ${telefono}
        📧 *Correo:* ${correo}
        📅 *Fecha del Evento:* ${new Date(fecha).toLocaleDateString('es-MX')}
        👥 *Cantidad de Personas:* ${cantidadPersonas}
        🎉 *Tipo de Evento:* ${tipoEvento}
        ${detalles ? `📝 *Detalles:* ${detalles}` : ''}
        
        ⏰ Solicitud: ${new Date().toLocaleString('es-MX')}
    `;

    // Enviar por email
    enviarPorEmail(nombre, telefono, correo, cantidadPersonas, detalles, 'cotizacion', fecha, tipoEvento);

    // Mostrar confirmación
    mostrarAlerta('¡Cotización enviada correctamente! Te contactaremos pronto.', 'success');
    
    // Limpiar formulario
    document.getElementById('formCotizacion').reset();
    
    // Cerrar modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('modalCotizacion'));
    modal.hide();
}

/**
 * Enviar email (simulado - en producción usar backend)
 */
function enviarPorEmail(nombre, telefono, correoOProducto, cantidadOPersonas, comentariosODetalles, tipo, fecha = null, tipoEvento = null) {
    // En una aplicación real, esto se enviaría a un servidor backend
    console.log('Email enviado:', {
        tipo,
        nombre,
        telefono,
        correoOProducto,
        cantidadOPersonas,
        comentariosODetalles,
        fecha,
        tipoEvento,
        timestamp: new Date().toISOString()
    });

    // Guardar en localStorage para demostración
    const datos = {
        tipo,
        nombre,
        telefono,
        correoOProducto,
        cantidadOPersonas,
        comentariosODetalles,
        fecha,
        tipoEvento,
        timestamp: new Date().toISOString()
    };
    
    let registros = JSON.parse(localStorage.getItem('elotesRegistros') || '[]');
    registros.push(datos);
    localStorage.setItem('elotesRegistros', JSON.stringify(registros));
}

/**
 * Mostrar alerta personalizada
 */
function mostrarAlerta(mensaje, tipo = 'info') {
    // Crear elemento de alerta
    const alerta = document.createElement('div');
    alerta.className = `alert alert-${tipo} alert-dismissible fade show`;
    alerta.setAttribute('role', 'alert');
    alerta.innerHTML = `
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    // Insertar en el DOM
    const container = document.querySelector('body');
    container.insertAdjacentElement('afterbegin', alerta);

    // Remover después de 5 segundos
    setTimeout(() => {
        alerta.remove();
    }, 5000);
}

// ============================================
// EFECTOS Y ANIMACIONES
// ============================================

/**
 * Animar elementos al hacer scroll
 */
document.addEventListener('DOMContentLoaded', function() {
    // Observador para animaciones al scroll
    const observador = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observador.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    // Observar todas las tarjetas
    document.querySelectorAll('.card, .promo-card, .testimonial-card, .contact-card').forEach(el => {
        observador.observe(el);
    });

    // Efecto hover en tarjetas
    document.querySelectorAll('.card, .promo-card, .testimonial-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Suavizar scroll en navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Cambiar navbar al hacer scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-sm');
        } else {
            navbar.classList.remove('shadow-sm');
        }
    });

    // Validación en tiempo real de formularios
    validarFormularios();

    // Inicializar tooltips de Bootstrap
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

/**
 * Validación en tiempo real de formularios
 */
function validarFormularios() {
    // Validar teléfono en tiempo real
    document.querySelectorAll('input[type="tel"]').forEach(input => {
        input.addEventListener('input', function() {
            // Permitir solo números
            this.value = this.value.replace(/\D/g, '');
        });
    });

    // Validar cantidad en tiempo real
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('change', function() {
            if (this.value < 1) {
                this.value = 1;
            }
        });
    });

    // Validar fecha no sea en el pasado
    document.getElementById('fechaEvento')?.addEventListener('change', function() {
        const fechaSeleccionada = new Date(this.value);
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        if (fechaSeleccionada < hoy) {
            mostrarAlerta('Por favor selecciona una fecha futura.', 'warning');
            this.value = '';
        }
    });
}

// ============================================
// FUNCIONALIDADES ADICIONALES
// ============================================

/**
 * Contar registros guardados
 */
function contarRegistros() {
    const registros = JSON.parse(localStorage.getItem('elotesRegistros') || '[]');
    console.log(`Total de registros: ${registros.length}`);
    return registros.length;
}

/**
 * Limpiar registros guardados
 */
function limpiarRegistros() {
    if (confirm('¿Estás seguro de que deseas limpiar todos los registros?')) {
        localStorage.removeItem('elotesRegistros');
        mostrarAlerta('Registros eliminados correctamente.', 'info');
    }
}

/**
 * Exportar registros como JSON
 */
function exportarRegistros() {
    const registros = JSON.parse(localStorage.getItem('elotesRegistros') || '[]');
    const dataStr = JSON.stringify(registros, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `elotes-registros-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
}

/**
 * Efecto de tipeo en títulos
 */
function efectoTipeo(elemento, texto, velocidad = 50) {
    let indice = 0;
    elemento.textContent = '';

    function escribir() {
        if (indice < texto.length) {
            elemento.textContent += texto.charAt(indice);
            indice++;
            setTimeout(escribir, velocidad);
        }
    }

    escribir();
}

// ============================================
// MODO OSCURO (Opcional)
// ============================================

/**
 * Toggle modo oscuro
 */
function toggleModoDark() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('modoDark', document.body.classList.contains('dark-mode'));
}

// Cargar preferencia de modo oscuro
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('modoDark') === 'true') {
        document.body.classList.add('dark-mode');
    }
});

// ============================================
// FUNCIONES DE UTILIDAD
// ============================================

/**
 * Formatear teléfono
 */
function formatearTelefono(telefono) {
    const numeros = telefono.replace(/\D/g, '');
    if (numeros.length === 10) {
        return `(${numeros.slice(0, 3)}) ${numeros.slice(3, 6)}-${numeros.slice(6)}`;
    }
    return telefono;
}

/**
 * Validar email
 */
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Obtener parámetros de URL
 */
function obtenerParametroURL(parametro) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parametro);
}

// ============================================
// INICIALIZACIÓN
// ============================================

// Log de inicialización
console.log('🌽 Elotes Don Frany - Landing Page Cargada');
console.log('Versión: 1.0.0');
console.log('Año: 2024');

