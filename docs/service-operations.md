# Service operations

This runbook records the control plane for the site and its media. It contains no credentials; authenticate interactively through the applicable MCP/CLI when needed.

## Responsibilities and source of truth

| Service                      | Use it for                                                         | Do not use it for                              |
| ---------------------------- | ------------------------------------------------------------------ | ---------------------------------------------- |
| Premiere Pro + UI bridge MCP | inspect/edit sequences, markers, tracks, and export decisions      | bulk file cutting outside the edit             |
| Cloudflare MCP               | R2 bucket/custom-domain configuration and Cloudflare DNS           | uploading large video payloads                 |
| Netlify MCP                  | site settings, production environment variables, and deploy status | DNS once Cloudflare is authoritative           |
| Wrangler + temporary Worker  | R2 object transfer, especially multipart uploads                   | a permanent public upload endpoint             |
| Namecheap                    | registrar and nameserver delegation                                | day-to-day DNS record changes after delegation |

## Premiere and chapter exports

Start the Premiere UI bridge from Premiere before calling its MCP server. First inspect the active project/sequence and its markers; treat file time and sequence time consistently. Make editorial edits, visibility changes, and chapter exports in Premiere/Adobe Media Encoder. Do not substitute ffmpeg for an edit that belongs in the Premiere timeline. Use ffmpeg only for a non-editorial delivery operation such as `+faststart` or verification; see the media pipeline.

## Cloudflare, R2, and DNS

The R2 bucket is `danoved-media`; the public media hostname is `media.danoved.xyz`. Cloudflare is authoritative for `danoved.xyz` after Namecheap delegates the domain to the Cloudflare-assigned nameservers. Keep DNS changes in Cloudflare from then on.

Use the Cloudflare MCP for control-plane work: confirm the zone is active, manage DNS records, and attach/inspect the R2 custom domain. Netlify's production site record and the R2 media host are separate concerns. After a DNS or custom-domain change, verify both public resolution and HTTPS; do not infer success just from a dashboard state.

## Large uploads

Use `wrangler r2 object put --remote` for ordinary files. Files larger than R2's 300 MB single-part limit require multipart upload. The established pattern is a temporary Worker with an R2 binding, a session-only bearer token, 64 MiB multipart parts, and a remote preview. Remove the Worker and its ignored upload workspace immediately after completion. Never commit upload tokens, credentials, or generated media files.

Set object metadata during upload:

```text
content-type: video/mp4
cache-control: public, max-age=31536000, immutable
```

Use a new versioned object key for each re-export. Details and commands live in [media-pipeline.md](media-pipeline.md).

## Netlify and the application

Manage the Netlify project through its MCP for settings and deploy status. The media base is a production build environment variable, not a runtime secret:

```text
NEXT_PUBLIC_MEDIA_BASE_URL=https://media.danoved.xyz
```

Because `NEXT_PUBLIC_*` is compiled into the client build, redeploy after changing it. Validate a
build locally with `pnpm build`; for chapter video changes also run `pnpm verify:media`.

The build uses Node 24 from `.nvmrc`. The separate Functions runtime is
`AWS_LAMBDA_JS_RUNTIME=nodejs24.x`, set through Netlify's environment-variable API. Netlify does
not support setting that variable in `netlify.toml`. On the Free plan, use the production context
with all scopes; granular `builds`-only scope writes are rejected. Always read environment
variables back after a write: both the MCP wrapper and CLI have returned success even when the
underlying API rejected an unsupported granular scope.

### Opaque function upload failures

`Failed to create function: Invalid AWS Lambda parameters` can mean the generated function exceeds
Lambda's 250 MiB uncompressed limit. Check the artifact rather than assuming the application build
failed:

```sh
ls -lh .netlify/functions/___netlify-server-handler.zip
unzip -l .netlify/functions/___netlify-server-handler.zip | tail -2
```

In this site, `src/api/llmsContent.ts` reads the portfolio source tree dynamically. Next's file
tracer therefore pulled every portfolio source image into the server handler even though Netlify
already serves them as static assets. The `outputFileTracingExcludes` rule in `next.config.js`
removes `src/pages/portfolio/**/images/**` from server traces. It reduced the handler from about
257 MB to 76 MB uncompressed. Do not remove that exclusion unless the llms implementation no
longer performs filesystem reads or the function is eliminated.

## Public verification checklist

1. Confirm DNS delegation with an external resolver and resolve the intended hostname.
2. Confirm HTTPS responds on the site and media hostname.
3. Confirm a media range request returns `206`, `accept-ranges: bytes`, `video/mp4`, and the immutable cache header:

   ```sh
   curl -sI -H 'Range: bytes=0-1' \
     https://media.danoved.xyz/apotheneum/03-rain.mp4
   ```

4. Confirm the deployed site was built after the environment-variable change and that a chapter page does not initiate a video request before a visitor presses play.

## Credential hygiene

Use MCP interactive authorization, the OS keychain, or untracked local environment files. Do not paste credentials into source, documentation, tickets, commit messages, shell history intended for sharing, or long-lived Workers. Keep public URLs and object keys in documentation; keep secrets out.
