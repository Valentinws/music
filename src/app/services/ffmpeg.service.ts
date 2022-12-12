import { Injectable } from '@angular/core';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

@Injectable({
  providedIn: 'root'
})
export class FfmpegService {
  isReady = false;
  isRunning = false;
  private ffmpeg;

    constructor() { 
  this.ffmpeg = createFFmpeg({ log: true })
    }
  
  async init() {
    if (this.isReady) {
      return
    }

    await this.ffmpeg.load()

    this.isReady = true; 

  }

  async getScreenshots(file: File) {
    this.isRunning = true;
    const data = await fetchFile(file)

    this.ffmpeg.FS('writeFile', file.name, data)

    const seconds = [1,2,3]
    const commands: string[] = [];

    seconds.forEach(second => {
      commands.push(
        // Input
        '-i', file.name,
        // >output options
        '-ss', `00:00:${second}`,
        '-frames:v', '1',
        '-filter:v', 'scale=510:-1',
        // output
        `output_${second}.png`
      )
    })

    await this.ffmpeg.run(
      ...commands
    )

    const screnshots: string[] = [];
    seconds.forEach(second => {
      const screnshotFile = this.ffmpeg.FS('readFile', `output_${second}.png`)
      const screnshotBlob = new Blob(
        [screnshotFile.buffer], {
          type: 'image/png'
        }
      )

      const screnshotURL = URL.createObjectURL(screnshotBlob)
      screnshots.push(screnshotURL)
    })
    this.isRunning = false;
    return screnshots

    // for one screnshot  
    // await this.ffmpeg.run(
    //   // Input
    //   '-i', file.name,
    //   // >output options
    //   '-ss', '00:00:01',
    //   '-frames:v', '1',
    //   '-filter:v', 'scale=510:-1',
    //   // output
    //   'output_1.png'
    // )
  }

  async blobFromUrl(url: string) {
    const response = await fetch(url)
    const blob = await response.blob()

    return blob; 
  }

}
