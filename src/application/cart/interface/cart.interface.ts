import { Product } from '@prisma/client';
import { UpdateProductDto } from 'src/application/product/dto/update-product.dto';
import { ISearchParams } from 'src/interface/query.interface';
import { AddCartProductDto } from '../dto/add-cart-product.dto';

export interface IProductService {
  /**
   * Cria um novo produto.
   * @param userId ID do usuário que está criando o produto.
   * @param newProduct DTO com os dados do novo produto.
   * @returns Uma Promise com o produto criado.
   */
  create(userId: string, newProduct: AddCartProductDto): Promise<Product>;

  /**
   * Lista produtos com base nos parâmetros de busca.
   * @param params Parâmetros para a busca (filtro, paginação, ordenação).
   * @returns Uma Promise com o total de produtos e a lista de produtos.
   */
  list(params: ISearchParams): Promise<[number, Product[]]>;

  /**
   * Busca um produto pelo seu ID.
   * @param id ID do produto.
   * @returns Uma Promise com o produto encontrado ou `undefined`.
   */
  findProductById(id: string): Promise<Product | undefined>;

  /**
   * Deleta (logicamente) um produto.
   * @param productId ID do produto a ser deletado.
   * @param userId ID do usuário que está realizando a ação.
   * @returns Uma Promise com o produto deletado ou `undefined`.
   */
  delete(productId: string, userId: string): Promise<Product | undefined>;

  /**
   * Atualiza um produto.
   * @param productId ID do produto a ser atualizado.
   * @param userId ID do usuário que está realizando a atualização.
   * @param newProduct DTO com os novos dados do produto.
   * @returns Uma Promise com o produto atualizado ou `void`.
   */
  update(
    productId: string,
    userId: string,
    newProduct: UpdateProductDto,
  ): Promise<Product | void>;
}
