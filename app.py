"""
from flask import Flask, render_template, request, flash
from flask_mail import Mail, Message
from dotenv import load_dotenv
import os

load_detovenv()

app = flask(__name__)

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.getenv('EMAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('EMAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('EMAIL_USERNAME')

Mail = Mail(app)
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/contact', methods=['GET', 'POST'])
def send_email():
    try:
        nombre = request.form['nombre']
        correo = request.form['email']
        mensaje = request.form['mensaje']

        msg = Message('Nuevo mensaje de contacto',
                        sender=app.config['MAIL_USERNAME'],
                        recipients=[app.config['MAIL_USERNAME']])
        msg.body = f"Nombre: {nombre}\nEmail: {correo}\nMensaje: {mensaje}"

        mail.send(msg)
        flash('Mensaje enviado correctamente.', 'success')
    except Exception as e:
        print(f"Error al enviar el mensaje: {e}")
        flash('Error al enviar el mensaje. Por favor, inténtalo de nuevo.', 'error')

    return render_template('contact.html')

if __name__ == '__main__':
    app.run(debug=True)
"""