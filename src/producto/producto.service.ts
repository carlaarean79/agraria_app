import { HttpException, HttpStatus, Injectable, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { ProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';


@Injectable()
export class ProductoService {
constructor(@InjectRepository(Producto) private readonly productoRepository:Repository<Producto>){}

 async create(datos: ProductoDto):Promise<Producto> {
   const existeProducto = await this.productoRepository.findOne({where:{name: datos.name}});
  if(existeProducto){
     throw new HttpException(`El producto ${datos.name} ya existe en la base de datos`,HttpStatus.CONFLICT);  
    } 
    try{
                let producto : Producto;
                if(datos.name && datos.descripcion && datos.price && datos.categoria && datos.entorno){
                  producto = new Producto(datos.name, datos.descripcion, datos.imagen, datos.price);
                  producto = await this.productoRepository.save(producto);
                  return producto;
                } else {
                  throw new NotFoundException(`No se proporcionaron los datos necesarios para crear el producto`);

                }
            
    }catch(error){
throw new HttpException(`No se puedo crear el producto ${datos.name}, intente nuevamente en unos segundos`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll():Promise<Producto[]> {
    try{

      let criterio: FindManyOptions = {relations: ['pedido','entorno','categoria']};
      const producto= await this.productoRepository.find(criterio);
      if(producto) return producto;
      throw new Error(`El fichero Producto aún está vacío. Por favor, primero ingrese una nueva carga de datos`);
    } catch(error){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error:`Se produjo un error al intentar obtener los productos. Compruebe los datos ingresados e intente nuevamente`
      }, HttpStatus.NOT_FOUND);
    }
  }

  async findOne(@Param('id', new ParseIntPipe({errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE})
)id: number):Promise<Producto>{
  try{

    let criterio: FindOneOptions = {relations:[], where:{id:id}};
    const producto = await this.productoRepository.findOne(criterio);
    if(producto) return producto;
  }catch(error){
    throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `Se produjo un error al intentar obtener el producto con id ${id}. Compruebe los datos ingresados e intente nuevamente` },
    HttpStatus.NOT_FOUND);
}
  }

 async updateProducto(id: number, datos:ProductoDto):Promise<Producto> {
    try{
let producto: Producto = await this.findOne(id);
if(producto){
  producto.name = datos.name;
  producto.descripcion = datos.descripcion;
  producto.imagen = datos.imagen;
  producto.price = datos.price;
  producto = await this.productoRepository.save(producto);
  return producto;
}
    }catch(error){
      throw new HttpException({ status: HttpStatus.NOT_FOUND,
        error: `Error al intentar actualizar el producto de id: ${id} con el nombre ${datos.name} en la base de datos; ${error}`},
        HttpStatus.NOT_FOUND);

    }
  }

  async remove(id: number, datos:ProductoDto):Promise<string> {
   try{
    const removeProducto: Producto = await this.findOne(id);
    if(!removeProducto) {
      return `El producto que desea eliminar no existe en la base de datos`
    } else{
      await this.productoRepository.remove(removeProducto);
      return `El producto ${removeProducto.name} ha sido eliminado correctamente de la base de edatos`
    }
   }catch (error) {
      throw new HttpException({ status: HttpStatus.NOT_FOUND,
          error: `Error al intentar eliminar el producto  ${datos.name} en la base de datos; ${error}`},
          HttpStatus.NOT_FOUND);
      }
    }
}
