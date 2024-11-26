document.addEventListener('DOMContentLoaded', () => {
    // Navegación desde index.html
    document.getElementById('registerButton')?.addEventListener('click', () => {
      window.location.href = 'register.html';
    });
  
    document.getElementById('loginButton')?.addEventListener('click', () => {
      window.location.href = 'login.html';
    });
  
    // Manejo del registro de usuarios en register.html
    document.getElementById('registerForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
  
      if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
      }
  
      localStorage.setItem('user', JSON.stringify({ email, password }));
      alert('Cuenta creada con éxito.');
      window.location.href = 'index.html';
    });
  
    // Manejo del inicio de sesión en login.html
    document.getElementById('loginForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;
  
      const storedUser = JSON.parse(localStorage.getItem('user'));
  
      if (storedUser && storedUser.email === email && storedUser.password === password) {
        alert('Inicio de sesión exitoso.');
        window.location.href = 'calculator.html';
      } else {
        alert('Correo o contraseña incorrectos.');
      }
    });
  
    // Lógica de la calculadora en calculator.html
    document.getElementById('calculatorForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const annualDemand = parseFloat(document.getElementById('annualDemand').value);
      const orderCost = parseFloat(document.getElementById('orderCost').value);
      const holdingCost = parseFloat(document.getElementById('holdingCost').value);
      const dailyDemand = parseFloat(document.getElementById('dailyDemand').value);
      const leadTime = parseFloat(document.getElementById('leadTime').value);
  
      if (annualDemand <= 0 || orderCost <= 0 || holdingCost <= 0 || dailyDemand <= 0 || leadTime <= 0) {
        alert('Por favor, ingrese valores positivos en todos los campos.');
        return;
      }
  
      const eoq = Math.sqrt((2 * annualDemand * orderCost) / holdingCost).toFixed(2);
      const rop = (dailyDemand * leadTime).toFixed(2);
      const ordersPerYear = (annualDemand / eoq).toFixed(2);
  
      document.getElementById('eoqResult').textContent = `EOQ (Cantidad Óptima de Pedido): ${eoq} unidades.`;
      document.getElementById('ropResult').textContent = `ROP (Punto de Reorden): ${rop} unidades.`;
      document.getElementById('ordersPerYearResult').textContent = `Número de Pedidos al Año: ${ordersPerYear} pedidos.`;
  
      document.getElementById('results').style.display = 'block';
      document.getElementById('explainEoq').style.display = 'inline-block';
      document.getElementById('explainRop').style.display = 'inline-block';
      document.getElementById('explainOrders').style.display = 'inline-block';
    });
  
    document.getElementById('explainEoq')?.addEventListener('click', () => {
      alert("El EOQ (Cantidad Óptima de Pedido) indica cuántas unidades debes pedir para minimizar los costos totales de inventario.");
    });
  
    document.getElementById('explainRop')?.addEventListener('click', () => {
      alert("El ROP (Punto de Reorden) indica cuándo debes realizar un pedido para evitar quedarte sin inventario.");
    });
  
    document.getElementById('explainOrders')?.addEventListener('click', () => {
      alert("El número de pedidos al año indica cuántas veces necesitas realizar un pedido para cubrir tu demanda anual.");
    });
  });
  
  
  
  