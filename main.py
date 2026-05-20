from flask import Flask, render_template, request, redirect, url_for, flash
 
app = Flask(__name__)
app.secret_key = 'mexsi-secret-key'  # Cambia esto en producción
 
 
# ── RUTAS ──────────────────────────────────────────────
 
@app.route('/')
def index():
    return render_template('index.html')
 
 
@app.route('/nosotros')
def nosotros():
    return render_template('nosotros.html')
 
 
@app.route('/servicios')
def servicios():
    return render_template('servicios.html')
 
 
@app.route('/contacto', methods=['GET', 'POST'])
def contacto():
    if request.method == 'POST':
        nombre  = request.form.get('nombre', '').strip()
        empresa = request.form.get('empresa', '').strip()
        email   = request.form.get('email', '').strip()
        servicio = request.form.get('servicio', '').strip()
        mensaje = request.form.get('mensaje', '').strip()
 
        # TODO: aquí conectas Flask-Mail, Resend, o guardas en DB
        # Por ahora solo imprime en consola para desarrollo:
        print(f"[Contacto] {nombre} | {empresa} | {email} | {servicio}")
        print(f"  Mensaje: {mensaje}")
 
        flash('¡Mensaje enviado! Nos pondremos en contacto pronto.', 'success')
        return redirect(url_for('contacto'))
 
    return render_template('contacto.html')
 
 
# ── ARRANQUE ───────────────────────────────────────────
 
if __name__ == '__main__':
    app.run(debug=True)