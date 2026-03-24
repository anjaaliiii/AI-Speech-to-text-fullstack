import { execSync } from "child_process";
import fs from "fs"
import path from "path"

const FFMPEG = "C:\\Users\\sushm\\Downloads\\ffmpeg-8.1-full_build\\ffmpeg-8.1-full_build\\bin\\ffmpeg.exe"

export const transcribeAudio = async(filePath) =>{
    const wavFile = filePath.replace(path.extname(filePath), ".wav")

    const outDir = path.dirname(wavFile)

    execSync(`"${FFMPEG}" -y -loglevel quiet -i "${filePath}" -ar 16000 -ac 1 "${wavFile}"`)

    execSync(
        `whisper "${wavFile}" --model small --language en --output_format txt --output_dir "${outDir}" >nul 2>&1`,
        {stdio:"ignore"}
    )

    const txtFile = wavFile.replace(".wav",".txt");
    if(!fs.existsSync(txtFile)){
        throw new Error("Transcription file not found")
    }

    const transcript = fs.readFileSync(txtFile,"utf-8");

    console.log(transcript.trim())

    try {
        fs.unlinkSync(filePath)
        fs.unlinkSync(wavFile)
    } catch (error) {
    }

    return {transcript};
}