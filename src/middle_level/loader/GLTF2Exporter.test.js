import GLBoost from '../../globals';
import GLTF2Loader from './GLTF2Loader';
import GLTF2Exporter from './GLTF2Exporter';
import ModelConverter from './ModelConverter';
import is from '../../low_level/misc/IsUtil';

jest.setTimeout(10000);

test('load gltf2 successfully', async () => {
  const glTFLoader = GLBoost.GLTF2Loader.getInstance();
  const modelConverter = GLBoost.ModelConverter.getInstance();
  const glmData = await glTFLoader.loadGLTF("https://storage.googleapis.com/dengine-203602.appspot.com/test_data/Triangle.gltf");
  expect(is.exist(glmData)).toBe(true);
});
