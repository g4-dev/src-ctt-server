import { Context, HookTarget, HttpError } from "../../deps.ts";
import {
  ensureDir,
  ensureDirSync,
  v4,
  move,
  MultipartReader,
  join,
  SEP,
} from "./uploadDeps.ts";

export type PayloadType = {
  path: string;
  extensions: Array<string>;
  maxSizeBytes: number;
  maxFileSizeBytes: number;
  saveFile: boolean;
  readFile: boolean;
  useCurrentDir: boolean;
};

const defaultUploadOptions: PayloadType = {
  path: "",
  extensions: [],
  maxSizeBytes: Number.MAX_SAFE_INTEGER,
  maxFileSizeBytes: Number.MAX_SAFE_INTEGER,
  saveFile: true,
  readFile: false,
  useCurrentDir: true,
};

const COMPLEX_FILE_DIR = false;

/**
 * Handle uploads
 * Use this middleware with CatchHook to catch upload errors
 */
export class UploadHook implements HookTarget<unknown, PayloadType> {
  async onPreAction(context: Context<unknown>, payload: PayloadType) {
    return new Promise(async (resolve, reject) => {
      const {
        path,
        extensions,
        maxSizeBytes,
        maxFileSizeBytes,
        saveFile,
        readFile,
        useCurrentDir,
      }: PayloadType = { ...defaultUploadOptions, ...payload };

      ensureDirSync(join(Deno.cwd(), "temp_uploads"));
      if (
        parseInt(context.request.headers.get("content-length") as string) >
          maxSizeBytes
      ) {
        reject(
          new HttpError(
            422,
            `Maximum total upload size exceeded, size: ${
              context.request.headers.get("content-length")
            } bytes, maximum: ${maxSizeBytes} bytes. `,
          ),
        );
      }
      const boundaryRegex = /^multipart\/form-data;\sboundary=(?<boundary>.*)$/;
      let match: RegExpMatchArray | null;
      if (
        context.request.headers.get("content-type") &&
        (match = context.request.headers.get("content-type")!.match(
          boundaryRegex,
        ))
      ) {
        const formBoundary: string = match.groups!.boundary;
        const mr = new MultipartReader(
          context.request.serverRequest.body,
          formBoundary,
        );
        const form = await mr.readForm(0);
        let res: any = {};
        let entries: any = Array.from(form.entries());
        let validations = "";
        for (const item of entries) {
          let values: any = [].concat(item[1]);
          for (const val of values) {
            if (val.filename !== undefined) {
              if (extensions.length > 0) {
                let ext = val.filename.split(".").pop();
                if (!extensions.includes(ext)) {
                  validations +=
                    `The file extension is not allowed (${ext} in ${val.filename}), allowed extensions: ${extensions}. `;
                }
              }
              if (val.size > maxFileSizeBytes) {
                validations +=
                  `Maximum file upload size exceeded, file: ${val.filename}, size: ${val.size} bytes, maximum: ${maxFileSizeBytes} bytes. `;
              }
            }
          }
        }
        if (validations != "") {
          await form.removeAll();
          reject(new HttpError(422, validations));
        }
        for (const item of entries) {
          let formField: any = item[0];
          let filesData: any = [].concat(item[1]);
          for (const fileData of filesData) {
            if (fileData.tempfile !== undefined) {
              let resData = fileData;
              if (readFile) {
                resData["data"] = await Deno.readFile(resData["tempfile"]);
              }
              if (saveFile) {
                const d = new Date();
                const uuid = COMPLEX_FILE_DIR
                  ? join(
                    d.getFullYear().toString(),
                    (d.getMonth() + 1).toString(),
                    d.getDate().toString(),
                    d.getHours().toString(),
                    d.getMinutes().toString(),
                    d.getSeconds().toString(),
                    v4.generate(),
                  )
                  : d.toISOString().slice(0, 10).replace(/-/g, "_");
                const uploadPath = join(path, uuid);
                let fullPath = uploadPath;
                if (useCurrentDir) {
                  fullPath = join(Deno.cwd(), fullPath);
                }
                await ensureDir(fullPath);
                await move(
                  fileData.tempfile,
                  join(fullPath, fileData.filename),
                );
                delete resData["tempfile"];
                resData["id"] = uuid.replace(/\\/g, "/");
                resData["url"] = encodeURI(
                  join(uploadPath, fileData.filename).replace(/\\/g, "/"),
                );
                resData["uri"] = join(fullPath, fileData.filename);
              } else {
                let tempFileName = resData.tempfile.split(SEP).pop();
                let pathTempFile = join(
                  Deno.cwd(),
                  "temp_uploads",
                  tempFileName,
                );
                await move(
                  resData.tempfile,
                  pathTempFile,
                );
                resData.tempfile = pathTempFile;
              }
              if (res[formField] !== undefined) {
                if (Array.isArray(res[formField])) {
                  res[formField].push(resData);
                } else {
                  res[formField] = [res[formField], resData];
                }
              } else {
                res[formField] = resData;
              }
            }
          }
        }
        resolve((context as any).request.uploadedFiles = res);
      } else {
        reject(
          new HttpError(
            422,
            'Invalid upload data, request must contains a body with form "multipart/form-data", and inputs with type="file". ',
          ),
        );
      }
    });
  }
}
