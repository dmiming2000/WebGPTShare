var B2 = A(8844);
      var F2 = A(27826),
        U2 = A(94326),
        G2 = A(19295),
        H2 = A(47675),
        V2 = A(38597),
        W2 = A(48879),
        J2 = A(31294),
        K2 = A(55398),
        q2 = A(78717);
        window.test11 = B2;

      var  g2 = A(40124);
      window.test1 = en;
      window.test2 = ee;
      window.test3 = eo;
      window.test4 = ei;
      window.test5 = es;
      var A2 = A;
      window.test10 = async function (e, t, A,websocket_request_id) {
        let $ = J2.g.getTracer("completion"),
          ee = (e) => (null == e ? void 0 : e.code) === "challenge_required";
        t =ev.handleResponse;

         A =   (e, t) => {
              (0, g2.F4)(eu, t, e, ei);
            }
        let a = async function () {
          // Define variables and constants
          var i, n, r, o;
          let l =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : null,
            d = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            c = new AbortController(),
            u = "threadId" in e ? e.threadId : void 0,
            g =
              "continueFromSharedConversationId" in e
                ? e.continueFromSharedConversationId
                : void 0,
            m = window.test11.Z(),
            p = {
              // Initialize the 'p' object with various properties
              action: e.completionType,
              messages: e.messages.length > 0 ? e.messages : void 0,
              conversation_id: u,
              continue_from_shared_conversation_id: null != u ? void 0 : g,
              parent_message_id: e.parentMessageId,
              model: e.model,
              plugin_ids: null != u ? void 0 : e.enabledPluginIds,
              timezone_offset_min: new Date().getTimezoneOffset(),
              variant_purpose:
                null === (i = e.completionMetadata) || void 0 === i
                  ? void 0
                  : i.variantPurpose,
              suggestions:
                null !== (n = e.completionMetadata) &&
                void 0 !== n &&
                n.suggestions
                  ? e.completionMetadata.suggestions.map((e) => (0, F2.bf)(e))
                  : void 0,
              history_and_training_disabled: e.historyDisabled,
              conversation_mode:
                null === (r = e.completionMetadata) || void 0 === r
                  ? void 0
                  : r.conversationMode,
              force_paragen: e.forceParagen,
              force_paragen_model_slug: e.forceParagenModel,
              force_nulligen: e.forceNulligen,
              force_rate_limit: e.forceRateLimit,
              reset_rate_limits: e.resetRateLimits,
              disable_system_content_toggling: e.disableSystemContentToggling,
              websocket_request_id: m,
              source:
                null === (o = e.completionMetadata) || void 0 === o
                  ? void 0
                  : o.source,
              force_use_sse: !G2.ut.isWebsocketConnected(),
            },
            f = await (0, U2.PE)(),
            v = "https://chatgpt.com/backend-api";
          f && (v = "https://chatgpt.com/backend-anon");
          function Y(e, t) {
            var A = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var a = Object.getOwnPropertySymbols(e);
              t &&
                (a = a.filter(function (t) {
                  return Object.getOwnPropertyDescriptor(e, t).enumerable;
                })),
                A.push.apply(A, a);
            }
            return A;
          }

          function X(e) {
            var a = A2(24312);
            for (var t = 1; t < arguments.length; t++) {
              var A = null != arguments[t] ? arguments[t] : {};
              t % 2
                ? Y(Object(A), !0).forEach(function (t) {
                    (0, a.Z)(e, t, A[t]);
                  })
                : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    e,
                    Object.getOwnPropertyDescriptors(A)
                  )
                : Y(Object(A)).forEach(function (t) {
                    Object.defineProperty(
                      e,
                      t,
                      Object.getOwnPropertyDescriptor(A, t)
                    );
                  });
            }
            console.log(e);
            return e;
          }
          let y = "".concat(v, "/conversation"),
            E = !0,
            b = f
              ? H2.c.getUnauthHeaders().additionalHeaders
              : await H2.c.getAuthedHeaders(),
            j = H2.c.getSentinelHeaders(
              e.chatReq,
              null != l ? l : e.arkoseToken,
              e.turnstileToken,
              e.proofToken
            ),
            w = X(X(X({}, b), (0, q2.F)()), j),
            C = $.startSpan("completion.first_token"),
            M = J2.g.setSpan(K2.D.active(), C);

          function Q(e) {
            if ("[DONE]" === e.data) {
                console.log("__"+websocket_request_id.replaceAll("-",""));
                window["__"+websocket_request_id.replaceAll("-","")] = window["temp"+websocket_request_id.replaceAll("-","")]
              c.abort();
              t({ type: "done" });
            } else if ("ping" === e.event) {
              // Handle ping event
            } else {
              try {
                let A = JSON.parse(e.data);
                window["temp"+websocket_request_id.replaceAll("-","")] = A;
                if (A.error) {
                  let e = new k.Q0(A.error);
                  throw (t({ type: "error", error: e }), e);
                }
                if ("type" in A) {
                  if ("gizmo_inline_review" === A.type) {
                    t({ type: "gizmo_inline_review", gizmoId: A.gizmo_id });
                  } else if ("title_generation" === A.type) {
                    t({
                      type: "title_generation",
                      title: A.title,
                      conversation_id: A.conversation_id,
                    });
                  } else if ("rate_limit_info" === A.type) {
                    t({
                      type: "rate_limit_info",
                      call_to_action: A.call_to_action,
                      resets_after: A.resets_after,
                      display_description: A.display_description,
                      limit_details: A.limit_details,
                    });
                  } else if ("moderation" === A.type) {
                    t({
                      type: "moderation",
                      conversationId: A.conversation_id,
                      messageId: A.message_id,
                      isCompletion: A.is_completion,
                      flagged: A.moderation_response.flagged,
                      blocked: A.moderation_response.blocked,
                      disclaimers: A.moderation_response.disclaimers,
                    });
                  } else if ("url_moderation" === A.type) {
                    t({
                      type: "url_moderation",
                      conversationId: A.conversation_id,
                      messageId: A.message_id,
                      url: A.url_moderation_result.full_url,
                      isSafe: A.url_moderation_result.is_safe,
                    });
                  } else if ("num_variants_in_stream" === A.type) {
                    t({
                      type: "num_variants_in_stream",
                      num_variants_in_stream: A.num_variants_in_stream,
                      display_treatment: A.display_treatment,
                    });
                  } else {
                    t({
                      type: "message",
                      message: A.message,
                      conversationId: A.conversation_id,
                    });
                    E && ((E = !1), C.end());
                  }
                }
              } catch (e) {


                if (e instanceof k.gK) throw new k.Q0(e.message);
              }
            }
          }
          let I = null,
            D = setTimeout(() => {
              console.log("Error TimeOut .");
            }, 3e400);
          return (
            (0, G2.iF)(m, Q, c.signal),
            K2.D.with(M, () =>
              (0, W2.L)(y, {
                method: "POST",
                credentials: "include",
                headers: X(
                  {
                    "Content-Type": "application/json",
                  },
                  w
                ),
                body: JSON.stringify(p),
                signal: c.signal,
                openWhenHidden: !0,
                async onopen(a) {
                  var s, i, n, r, o, l, d;
                  let u =
                      null !== (s = a.headers.get("content-type")) &&
                      void 0 !== s
                        ? s
                        : "",
                    g =
                      null !== (i = a.headers.get("Cf-Ray")) && void 0 !== i
                        ? i
                        : null;
                  if (a.ok && u.includes("text/event-stream")) {

                    (I = !1), A(g, e.model);
                    return;
                  }
                  if (u.includes("application/json")) {
                    let s = await a.json(),
                      {
                        webSocketUrl: i,
                        fallbackWebSocketUrl: u,
                        conversationId: m,
                        responseId: p,
                        expiresAt: h,
                        websocketRequestId: x,
                      } = (0, G2.IP)(s);
                    if (null != i && null != m && null != p && null != x && h) {
                      (I = !0), A(g, e.model);
                      function delay(ms) {
                          return new Promise(resolve => setTimeout(resolve, ms));
                      }
                      try {
                          //网速不好需要延迟
                          await delay(5000);

                        await (0, G2.fg)(i, u, h, m, p, x, Q, c.signal, D);
                      } catch (e) {
                        e instanceof k.Q0 && t({ type: "error", error: e });
                      }
                      // throw new et();
                    }
                    {
                      let e =
                          null !== (n = null == s ? void 0 : s.error) &&
                          void 0 !== n
                            ? n
                            : null == s
                            ? void 0
                            : s.detail,
                        t =
                          null !==
                            (r =
                              null !== (o = null == e ? void 0 : e.message) &&
                              void 0 !== o
                                ? o
                                : e) && void 0 !== r
                            ? r
                            : "Unknown server error";
                      if (e) {
                        if (ee(e)) throw new k.gK(t, a.status, e.code);
                        if (a.status >= 500) throw new k.Q0(t);
                        if (
                          (((null == e ? void 0 : e.code) ===
                            "expired_session_key" ||
                            (null == e ? void 0 : e.code) ===
                              "invalid_api_key" ||
                            (null == e ? void 0 : e.code) ===
                              "token_expired") &&
                            (null ===
                              (l = (d = window)._oaiHandleSessionExpired) ||
                              void 0 === l ||
                              l.call(d, "stream", JSON.stringify(e))),
                          (null == e ? void 0 : e.code) ===
                            "deactivated_workspace")
                        ) {
                          window.location.href.includes(
                            "/workspace/deactivated"
                          ) ||
                            (window.location.href = "/workspace/deactivated");
                          return;
                        }
                        throw new k.gK(
                          t,
                          a.status,
                          null == e ? void 0 : e.code,
                          null == e ? void 0 : e.type,
                          void 0,
                          null == e ? void 0 : e.clears_in
                        );
                      }
                    }
                  }
                  throw new k.Q0(k.if);
                },
                onmessage: (e) => {
                  if (I) throw new k.Q0(k.if);
                  D && (clearTimeout(D), (D = null));
                  Q(e);
                },
                onerror(e) {
                     console.log("websocket_request_id Error 001: " ,websocket_request_id,e);
                     window["__"+websocket_request_id.replaceAll("-","")] = "{}";
                  var A;
                  let a = e instanceof Error ? e : Error(JSON.stringify(e));
                  if (a instanceof et || I || (ee(a) && !d)) throw a;
                  throw (
                    ("Failed to fetch" === a.message &&
                      (a = new k.Q0(
                        "An error occurred. Either the engine you requested does not exist or there was another issue processing your request. ".concat(
                          k.G_
                        )
                      )),
                    "network error" === a.message &&
                      (a.message =
                        "A network error occurred. Please check your connection and try again. ".concat(
                          k.G_
                        )),
                    (0, V2.L)("fetch-error:conversation:new-message", {
                      url: y,
                      message:
                        null === (A = a) || void 0 === A ? void 0 : A.message,
                    }),
                    t({ type: "error", error: a }),
                    a)
                  );
                },
              })
            ).catch(async (t) => {
              if (ee(t)) {
                   console.log("websocket_request_id Error 002: " ,websocket_request_id,e);
                   window["__"+data.websocket_request_id.replaceAll("-","")] = "{}";
                if (!d) return a(await s.ZP.getEnforcementToken(e.chatReq), !0);
                throw new k.gK(
                  "Failed to complete your call, please try again",
                  t.status
                );
              }
              t instanceof et || O.U.addError(t);
            }),
            c
          );
        };

          try {
              return a();
          } catch (e) {

          }
      };