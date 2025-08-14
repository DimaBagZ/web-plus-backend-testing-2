import { PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe('.findMany', () => {
    const posts = [
      { text: 'Post 1' },
      { text: 'Post 2' },
      { text: 'Post 3' },
      { text: 'Post 4' },
    ];

    beforeEach(() => {
      posts.forEach((post) => postsService.create(post));
    });

    it('should return all posts if called without options', () => {
      // Подготовка - создаем ожидаемый массив всех постов с ID
      const expectedPosts = posts.map((post, index) => ({
        ...post,
        id: (index + 1).toString(),
      }));

      // Действие - вызываем метод без параметров
      const result = postsService.findMany();

      // Проверка - сравниваем результат с ожидаемым
      expect(result).toEqual(expectedPosts);
    });

    it('should return correct posts for skip and limit options', () => {
      // Подготовка - задаем параметры skip и limit, создаем ожидаемый результат
      const skip = 1;
      const limit = 2;
      const expectedPosts = posts.slice(skip, skip + limit).map((post, index) => ({
        ...post,
        id: (skip + index + 1).toString(), // skip=1, index=0 -> id=2, index=1 -> id=3
      }));

      // Действие - вызываем метод с параметрами skip и limit
      const result = postsService.findMany({ skip, limit });

      // Проверка - сравниваем результат с ожидаемым
      expect(result).toEqual(expectedPosts);
    });

    it('should return posts with only skip option', () => {
      // Подготовка - задаем только параметр skip, создаем ожидаемый результат
      const skip = 2;
      const expectedPosts = posts.slice(skip).map((post, index) => ({
        ...post,
        id: (skip + index + 1).toString(), // skip=2, index=0 -> id=3, index=1 -> id=4
      }));

      // Действие - вызываем метод только с параметром skip
      const result = postsService.findMany({ skip });

      // Проверка - сравниваем результат с ожидаемым
      expect(result).toEqual(expectedPosts);
    });

    it('should return posts with only limit option', () => {
      // Подготовка - задаем только параметр limit, создаем ожидаемый результат
      const limit = 2;
      const expectedPosts = posts.slice(0, limit).map((post, index) => ({
        ...post,
        id: (index + 1).toString(),
      }));

      // Действие - вызываем метод только с параметром limit
      const result = postsService.findMany({ limit });

      // Проверка - сравниваем результат с ожидаемым
      expect(result).toEqual(expectedPosts);
    });

    it('should return empty array when skip is greater than posts count', () => {
      // Подготовка - задаем skip больше количества постов
      const skip = 10;

      // Действие - вызываем метод с большим значением skip
      const result = postsService.findMany({ skip });

      // Проверка - ожидаем пустой массив
      expect(result).toEqual([]);
    });

    it('should return all posts when limit is greater than posts count', () => {
      // Подготовка - задаем limit больше количества постов, создаем ожидаемый результат
      const limit = 10;
      const expectedPosts = posts.map((post, index) => ({
        ...post,
        id: (index + 1).toString(),
      }));

      // Действие - вызываем метод с большим значением limit
      const result = postsService.findMany({ limit });

      // Проверка - сравниваем результат с ожидаемым (все посты)
      expect(result).toEqual(expectedPosts);
    });

    it('should return empty array when skip equals posts count', () => {
      // Подготовка - задаем skip равный количеству постов
      const skip = 4;

      // Действие - вызываем метод с skip равным количеству постов
      const result = postsService.findMany({ skip });

      // Проверка - ожидаем пустой массив
      expect(result).toEqual([]);
    });

    it('should return empty array when skip and limit result in no posts', () => {
      // Подготовка - задаем комбинацию skip и limit, которая не вернет посты
      const skip = 4;
      const limit = 1;

      // Действие - вызываем метод с параметрами, которые не вернут посты
      const result = postsService.findMany({ skip, limit });

      // Проверка - ожидаем пустой массив
      expect(result).toEqual([]);
    });

    it('should handle zero values for skip and limit', () => {
      // Подготовка - задаем нулевые значения для skip и limit
      const skip = 0;
      const limit = 0;
      const expectedPosts = posts.slice(0, 0).map((post, index) => ({
        ...post,
        id: (index + 1).toString(),
      }));

      // Действие - вызываем метод с нулевыми значениями
      const result = postsService.findMany({ skip, limit });

      // Проверка - сравниваем результат с ожидаемым (пустой массив)
      expect(result).toEqual(expectedPosts);
    });
  });
});
