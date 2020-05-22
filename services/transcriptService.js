import transcriptRepo from "../repo/transcriptRepo.js"
import TranscriptModel from '../model/transcriptModel.ts'

export const getTranscripts = async () => {
  const transcripts = await transcriptRepo.selectAll()

  var result = new Array()

  transcripts.rows.map(transcript => {
    var obj = new TranscriptModel()

    transcripts.rowDescription.columns.map((el, i) => {
      obj[el.name] = transcript[i]
    })
    result.push(obj)
  })

  return result
}

export const getTranscript = async transcriptId => {
  const transcripts = await transcriptRepo.selectById(transcriptId)

  var obj = new Object()
  transcripts.rows.map(transcript => {
    transcripts.rowDescription.columns.map((el, i) => {
      obj[el.name] = transcript[i]
    })
  })

  return obj
}

export const createTranscript = async transcriptData => {
  const newTranscript = {
    name: String(transcriptData.name),
    brand: String(transcriptData.brand),
    is_live: "is_live" in transcriptData ? Boolean(transcriptData.is_live) : false,
    created_at: new Date()
  }

  await transcriptRepo.create(newTranscript)

  return newTranscript.id
}

export const updateTranscript = async (transcriptId, transcriptData) => {
  const transcript = await getTranscript(transcriptId)

  if (Object.keys(transcript).length === 0 && transcript.constructor === Object) {
    throw new Error("Transcript not found")
  }

  const updatedTranscript = {
    name: transcriptData.name !== undefined ? String(transcriptData.name) : transcript.name,
    brand: transcriptData.brand !== undefined ? String(transcriptData.brand) : transcript.brand,
    is_live:
      transcriptData.is_live !== undefined
        ? Boolean(transcriptData.is_live)
        : transcript.is_live
  }

  transcriptRepo.update(transcriptId, updatedTranscript)
}

export const deleteTranscript = async TranscriptId => {
  transcriptRepo.delete(TranscriptId)
}