/* @flow */

import GLBoost from '../globals';

export default class AnimationPlayer {
  __FpsForPlaying: number;
  __animationStartTime: number;
  __animationEndTime: number;
  __animationStartRange: number;
  __animationEndRange: number;
  __animationCurrentTime: number;
  __animationLength: number;
  __animationLastTime: number;
  __currentMillisecondAtStart: number;
  __isPlaying: boolean;
  __currentMotion: string;

  __animationMotions: Array<any>;

  constructor() {
  }

  init(group:any) {
    this.__FpsForPlaying = (group.animationFps !== void 0) ? group.animationFps:60;

    this.__animationStartTime = group.getStartAnimationInputValue('time');
    this.__animationEndTime = group.getEndAnimationInputValue('time');
    this.__animationStartRange = this.__animationStartTime;
    this.__animationEndRange = this.__animationEndTime;
    this.__animationCurrentTime = this.__animationStartTime;
    this.__animationLength = group.getEndAnimationInputValue('time');
    this.__animationLastTime = 0;

    this.__currentMillisecondAtStart = 0;
    this.__isPlaying = false;
    this.__currentMotion = "All";
    this.__animationMotions = [];

    this.__setupMultiMotions(group);
  }

  play() {
    this.__isPlaying = true;
    this.__currentMillisecondAtStart = Date.now();
  }

  calcAnimationTime(speedRatio:number = 1) {
    if (!this.__isPlaying) {
      this.__currentMillisecondAtStart = Date.now();
      return this.__animationCurrentTime;
    }

    let currentMillisecondFromStart = Date.now()
    this.__animationCurrentTime = (currentMillisecondFromStart - this.__currentMillisecondAtStart)/1000 + this.__animationLastTime;
    let localAnimationCurrentTime = this.__animationCurrentTime * speedRatio;

    if (localAnimationCurrentTime > this.__animationEndRange) {
      this.moveToTheTime(this.__animationStartRange);
    } else if (localAnimationCurrentTime < this.__animationStartRange) {
      this.moveToTheTime(this.__animationStartRange);
    }

    if (this.__animationStartRange > this.__animationLength) {
      this.moveToTheTime(this.__animationStartRange);
    }

    this.__animationCurrentTime = localAnimationCurrentTime / speedRatio;

    return localAnimationCurrentTime;
  }

  __setupMultiMotions(group:any) {
    const json = {
      "name": "All",
      "start": group.getStartAnimationInputValue('time') * this.__FpsForPlaying,
      "end": group.getEndAnimationInputValue('time') * this.__FpsForPlaying
    };

    this.animationMotions.push(json);

    if (!group.animationTracks) {
      return;
    }
    
    if (group.animationTracks) {
      Array.prototype.push.apply(this.animationMotions, group.animationTracks);
    }

    this.__currentMotion = group.animationTracks[0].name;
  }

  moveToTheTime(time:number) {
    this.__currentMillisecondAtStart = Date.now();
    this.__animationCurrentTime = time;
    this.__animationLastTime = this.__animationCurrentTime;
  }

  changeMotion(motionName:string) {
    for(let motion of this.__animationMotions) {
      if (motion.name === motionName) {
        this.changeRange(motion.start / this.__FpsForPlaying, motion.end / this.__FpsForPlaying);
        this.moveToTheTime(motion.start / this.__FpsForPlaying);
      }
    }
  }

  changeRange(start:number, end:number) {
    this.__animationStartRange = start;
    this.__animationEndRange = end;
    const time = this.__animationCurrentTime;
    this.moveToTheTime(time);
  };

  get animationMotions() {
    return this.__animationMotions;
  }

  set animationMotions(motions) {
    this.__animationMotions = motions;
  }
}

GLBoost['AnimationPlayer'] = AnimationPlayer;
