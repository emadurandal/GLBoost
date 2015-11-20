import Shader from './Shader'
import {SimpleShaderSource} from './SimpleShader'

export class BlendShapeShaderSource {

  VSDefine_BlendShapeShaderSource(in_, out_, f) {
    var shaderText = '';
    f.forEach((attribName)=>{
      if (this._isShapeTarget(attribName)) {
        shaderText+=`${in_} vec3 aVertex_${attribName};\n`;
        shaderText+='uniform float blendWeight_' + attribName  + ';\n';
      }
    });
    return shaderText;
  }

  VSTransform_BlendShapeShaderSource(existCamera_f, f) {
    var shaderText = '';
    shaderText +=     'float sumOfWeights = 0.0;\n';
    f.forEach((attribName)=>{
      if (this._isShapeTarget(attribName)) {
        shaderText += 'sumOfWeights += blendWeight_' + attribName +';\n';
      }
    });
    var numOfShapeTargets = this._numberOfShapeTargets(f);
    shaderText += '    vec3 blendedPosition = aVertex_position * max(1.0 - sumOfWeights/float(' + numOfShapeTargets + '), 0.0);\n';
    f.forEach((attribName)=>{
      if (this._isShapeTarget(attribName)) {
        shaderText += 'blendedPosition += aVertex_' + attribName + ' * blendWeight_' + attribName + '/float(' + numOfShapeTargets + ');\n';
      }
    });
    if (existCamera_f) {
      shaderText += '  gl_Position = projectionAndViewMatrix * vec4(blendedPosition, 1.0);\n';
    } else {
      shaderText += '  gl_Position = vec4(blendedPosition, 1.0);\n';
    }
    return shaderText;
  }

  prepare_BlendShapeShaderSource(vertexAttribs, existCamera_f, shaderProgram, gl) {
    var vertexAttribsAsResult = [];
    vertexAttribs.forEach((attribName)=>{
      if (this._isShapeTarget(attribName)) { // if POSITION and ShapeTargets...
        vertexAttribsAsResult.push(attribName);
        shaderProgram['vertexAttribute_' + attribName] = gl.getAttribLocation(shaderProgram, 'aVertex_' + attribName);
        gl.enableVertexAttribArray(shaderProgram['vertexAttribute_' + attribName]);
      }
    });

    vertexAttribs.forEach((attribName)=>{
      if (this._isShapeTarget(attribName)) {
        shaderProgram['uniformFloatSampler_blendWeight_' + attribName] = gl.getUniformLocation(shaderProgram, 'blendWeight_' + attribName);
        // とりあえずゼロ初期化
        gl.uniform1f(shaderProgram['uniformFloatSampler_blendWeight_' + attribName], 0.0);
      }
    });

    return vertexAttribsAsResult;
  }

}


export default class BlendShapeShader extends Shader {
  constructor(canvas) {

    super(canvas, BlendShapeShader);
    BlendShapeShader.mixin(SimpleShaderSource);
    BlendShapeShader.mixin(BlendShapeShaderSource);
  }

  _isShapeTarget(attribName) {
    return !Shader._exist(attribName, GLBoost.POSITION) && !Shader._exist(attribName, GLBoost.COLOR) && !Shader._exist(attribName, GLBoost.TEXCOORD);
  }

  _numberOfShapeTargets(attributes) {
    var count = 0;
    attributes.forEach((attribName)=>{
      if (this._isShapeTarget(attribName)) {
        count += 1;
      }
    });
    return count;
  }

  static getInstance(canvas) {
    if (BlendShapeShader._instances[canvas.id] instanceof BlendShapeShader) {
      return BlendShapeShader._instances[canvas.id];
    } else {
      return new BlendShapeShader(canvas);
    }
  }

}
