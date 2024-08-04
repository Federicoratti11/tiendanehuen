class Producto {
  constructor(id, nombre, categoria, precio,img,marca) {
      this.id = id;
      this.nombre = nombre;
      this.categoria = categoria;
      this.precio = precio;
      this.img= img;
      this.marca= marca;
  }}

const Productos = [
  
  new Producto(16, "Bolson de fruta", "fruta",3870 ,"combofrut.png","",),
  new Producto(1, "Atado de Espinaca", "Verduras", 1680, "espinaca.png","",),
  new Producto(2, "Semillas de lino 250gr", "Almacen", 565,"semillalino.png","",),
  new Producto(3, "Soja texturizada 1/2kg", "Almacen", 1420, "sojatexturizada.png","",),
  new Producto(4, "nueces pecan 250grs", "Almacen", 3120, "pecan.png","",),
  new Producto(5, "Pasta de Aceitunas Verdes", "Almacen", 3240,"pastaaceituna.jpeg", "san nicolas"),
  new Producto(6, "Pure de Tomate organico" , "Almacen", 4830, "puretomate.jpg", "san nicolas"),
  new Producto(7, "Te en hebras 50G", "Almacen", 3150, "tes.jpg", "Masale"),
  new Producto(8, "Cepillo de dientes El alquimi", "Cosmetica", 3000, "cepillo.png", "el alquimiartesanal"),
  new Producto(9, "Acondicionador", "Cosmetica", 6400, "acondicionador.png", "el alquimiartesanal"),
  new Producto(10, "Mani sin sal 1/2 kg", "Almacen", 3250, "manii.jpeg", "Organicoop"),
  new Producto(11, "Yerba Roapipo 500grs", "Almacen",4870, "roapipo.jpeg", "roapipo"),
  new Producto(14, "Banana climatizada Formosa 1kg", "fruta", 1870, "bananas.png","",),
  new Producto(15, "Pera Packham 1kg", "fruta", 1650, "peras.png","",),
];
  
