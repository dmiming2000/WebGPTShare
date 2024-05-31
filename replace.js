
window.test1 = er;
window.test2 = A(98606);
window.test4 = A(19139);
var A55=A;
      window.test10 = async function (e, t, A,websocket_request_id) {

          var  i = A55(98606)
        , c = A55(54945)
        , u = A55(73128)
        , g = A55(34350)
        , m = A55(40124)
        , p = A55(44194)
        , h = A55(93693)
        , x = A55(16602)
        , f = A55(8025)
        , v = A55(45232);
          var a2 = A55(24312);
          var G = A55(27826)
        , H = A55(94326)
        , V = A55(19295)
        , W = A55(47675)
        , J = A55(38597)
        , q = A55(48879)
        , K = A55(31294)
        , Y = A55(55398)
        , X = A55(78717);
          var  K = A55(31294);
          var B = A55(82988)
        , C = A55(34470)
        , M = A55(8844);
          function $(e, t) {
          var A = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
              var a = Object.getOwnPropertySymbols(e);
              t && (a = a.filter(function(t) {
                  return Object.getOwnPropertyDescriptor(e, t).enumerable
              })),
              A.push.apply(A, a)
          }
          return A
      }
      function ee(e) {
          for (var t = 1; t < arguments.length; t++) {
              var A = null != arguments[t] ? arguments[t] : {};
              t % 2 ? $(Object(A), !0).forEach(function(t) {
                  (0,
                  a2.Z)(e, t, A[t])
              }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(A)) : $(Object(A)).forEach(function(t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(A, t))
              })
          }
          return e
      }
        let et = K.g.getTracer("completion")
        , eA = e=>(null == e ? void 0 : e.code) === "challenge_required";
      class ea extends Error {
      }
        t =ey.handleResponse;
        let ec = (0,
              c.Lp)()
                , eu = "".concat(g.Vh).concat(e, "-").concat(ec)
                , eg = "".concat(e, "-").concat(ec);

         A =   (e,t)=>{
                  (0,
                  m.F4)(eg, t, e, "")
              }
        let a = async function() {
                              var s, n, r, o;
                              let l = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null
                                , d = arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
                                , c = new AbortController
                                , u = "threadId"in e ? e.threadId : void 0
                                , g = "continueFromSharedConversationId"in e ? e.continueFromSharedConversationId : void 0
                                , m = (0,
                              M.Z)()
                                , p = {
                                  action: e.completionType,
                                  messages: e.messages.length > 0 ? e.messages : void 0,
                                  conversation_id: u,
                                  continue_from_shared_conversation_id: null != u ? void 0 : g,
                                  parent_message_id: e.parentMessageId,
                                  model: e.model,
                                  plugin_ids: null != u ? void 0 : e.enabledPluginIds,
                                  timezone_offset_min: new Date().getTimezoneOffset(),
                                  variant_purpose: null === (s = e.completionMetadata) || void 0 === s ? void 0 : s.variantPurpose,
                                  suggestions: null !== (n = e.completionMetadata) && void 0 !== n && n.suggestions ? e.completionMetadata.suggestions.map(e=>(0,
                                  G.bf)(e)) : void 0,
                                  history_and_training_disabled: e.historyDisabled,
                                  conversation_mode: null === (r = e.completionMetadata) || void 0 === r ? void 0 : r.conversationMode,
                                  force_paragen: e.forceParagen,
                                  force_paragen_model_slug: e.forceParagenModel,
                                  force_nulligen: e.forceNulligen,
                                  force_rate_limit: e.forceRateLimit,
                                  reset_rate_limits: e.resetRateLimits,
                                  disable_system_content_toggling: e.disableSystemContentToggling,
                                  websocket_request_id: m,
                                  source: null === (o = e.completionMetadata) || void 0 === o ? void 0 : o.source,
                                  force_use_sse: !V.ut.isWebsocketConnected()
                              }
                                , h = await (0,
                              H.PE)()
                                , v = "https://chatgpt.com/backend-api";
                              h && (v = "https://chatgpt.com/backend-anon");
                              let y = "".concat(v, "/conversation")
                                , b = !0
                                , E = h ? W.c.getUnauthHeaders().additionalHeaders : await W.c.getAuthedHeaders()
                                , j = W.c.getSentinelHeaders(e.chatReq, null != l ? l : e.arkoseToken, e.turnstileToken, e.proofToken)
                                , w = ee(ee(ee({}, E), (0,
                              X.F)()), j)
                                , k = et.startSpan("completion.first_token")
                                , O = K.g.setSpan(Y.D.active(), k);
                              function Q(e) {
                                  if ("[DONE]" === e.data){
                                      console.log("__" + websocket_request_id.replaceAll("-", ""));
                                  window["__" + websocket_request_id.replaceAll("-", "")] = window["temp" + websocket_request_id.replaceAll("-", "")];
                                      c.abort(),
                                      t({
                                          type: "done"
                                      });}
                                  else if ("ping" === e.event)
                                      ;
                                  else
                                      try {
                                          let A = JSON.parse(e.data);
                                          window["temp" + websocket_request_id.replaceAll("-", "")] = A;
                                          if (A.error) {
                                              let e = new B.Q0(A.error);
                                              throw t({
                                                  type: "error",
                                                  error: e
                                              }),
                                              e
                                          }
                                          "type"in A ? "gizmo_inline_review" === A.type ? t({
                                              type: "gizmo_inline_review",
                                              gizmoId: A.gizmo_id
                                          }) : "title_generation" === A.type ? t({
                                              type: "title_generation",
                                              title: A.title,
                                              conversation_id: A.conversation_id
                                          }) : "rate_limit_info" === A.type ? t({
                                              type: "rate_limit_info",
                                              call_to_action: A.call_to_action,
                                              resets_after: A.resets_after,
                                              display_description: A.display_description,
                                              limit_details: A.limit_details
                                          }) : "moderation" === A.type ? t({
                                              type: "moderation",
                                              conversationId: A.conversation_id,
                                              messageId: A.message_id,
                                              isCompletion: A.is_completion,
                                              flagged: A.moderation_response.flagged,
                                              blocked: A.moderation_response.blocked,
                                              disclaimers: A.moderation_response.disclaimers
                                          }) : "url_moderation" === A.type ? t({
                                              type: "url_moderation",
                                              conversationId: A.conversation_id,
                                              messageId: A.message_id,
                                              url: A.url_moderation_result.full_url,
                                              isSafe: A.url_moderation_result.is_safe
                                          }) : "num_variants_in_stream" === A.type ? t({
                                              type: "num_variants_in_stream",
                                              num_variants_in_stream: A.num_variants_in_stream,
                                              display_treatment: A.display_treatment
                                          }) : "conversation_detail_metadata" === A.type && t({
                                              type: "conversation_detail_metadata",
                                              banner_info: A.banner_info,
                                              default_model_slug: A.default_model_slug,
                                              model_limits: A.model_limits,
                                              popup_info: A.popup_info
                                          }) : (t({
                                              type: "message",
                                              message: A.message,
                                              conversationId: A.conversation_id
                                          }),
                                          b && (b = !1,
                                          k2.end()))
                                      } catch (e) {
                                          if (e instanceof B.gK)
                                              throw new B.Q0(e.message)
                                      }
                              }
                              let I = null
                                , D = setTimeout(()=>{
                                  !0 === I ? x.A.logEvent(f.M.asyncResponseWaitTooLong, {}) : !1 === I && x.A.logEvent(f.M.sseResponseWaitTooLong, {})
                              }
                              , 3e4);
                              return (0,
                              V.iF)(m, Q, c.signal),
                              Y.D.with(O, ()=>(0,
                              q.L)(y, {
                                  method: "POST",
                                  credentials: "include",
                                  headers: ee({
                                      "Content-Type": "application/json"
                                  }, w),
                                  body: JSON.stringify(p),
                                  signal: c.signal,
                                  openWhenHidden: !0,
                                  async onopen(a) {
                                      var s, i, n, r, o, l, d;
                                      let u = null !== (s = a.headers.get("content-type")) && void 0 !== s ? s : ""
                                        , g = null !== (i = a.headers.get("Cf-Ray")) && void 0 !== i ? i : null;
                                      if (a.ok && u.includes("text/event-stream")) {
                                          I = !1,
                                          A(g, e.model);
                                          return
                                      }
                                      if (u.includes("application/json")) {
                                          let s = await a.json()
                                            , {webSocketUrl: i, fallbackWebSocketUrl: u, conversationId: m, responseId: p, expiresAt: h, websocketRequestId: x} = (0,
                                          V.IP)(s);
                                          if (null != i && null != m && null != p && null != x && h) {
                                              I = !0,
                                              A(g, e.model);
                                              try {
                                                  await (0,
                                                  V.fg)(i, u, h, m, p, x, Q, c.signal, D)
                                              } catch (e) {
                                                  e instanceof B.Q0 && t({
                                                      type: "error",
                                                      error: e
                                                  })
                                              }
                                              throw new ea
                                          }
                                          {
                                              let e = null !== (n = null == s ? void 0 : s.error) && void 0 !== n ? n : null == s ? void 0 : s.detail
                                                , t = null !== (r = null !== (o = null == e ? void 0 : e.message) && void 0 !== o ? o : e) && void 0 !== r ? r : "Unknown server error";
                                              if (e) {
                                                  if (eA(e))
                                                      throw new B.gK(t,a.status,e.code);
                                                  if (a.status >= 500)
                                                      throw new B.Q0(t);
                                                  if (((null == e ? void 0 : e.code) === "expired_session_key" || (null == e ? void 0 : e.code) === "invalid_api_key" || (null == e ? void 0 : e.code) === "token_expired") && (null === (l = (d = window)._oaiHandleSessionExpired) || void 0 === l || l.call(d, "stream", JSON.stringify(e))),
                                                  (null == e ? void 0 : e.code) === "deactivated_workspace") {
                                                      window.location.href.includes("/workspace/deactivated") || (window.location.href = "/workspace/deactivated");
                                                      return
                                                  }
                                                  throw new B.gK(t,a.status,null == e ? void 0 : e.code,null == e ? void 0 : e.type,void 0,null == e ? void 0 : e.clears_in)
                                              }
                                          }
                                      }
                                      throw new B.Q0(B.qV)
                                  },
                                  onmessage: e=>{
                                      if (I)
                                          throw new B.Q0(B.qV);
                                      D && (clearTimeout(D),
                                      D = null),
                                      Q(e)
                                  }
                                  ,
                                  onerror(e) {
                                      console.log("websocket_request_id Error 001: ", websocket_request_id, e);
                                      window["__" + websocket_request_id.replaceAll("-", "")] = "{}";
                                      var A;
                                      let a = e instanceof Error ? e : Error(JSON.stringify(e));
                                      if (a instanceof ea || I || eA(a) && !d)
                                          throw a;
                                      throw "Failed to fetch" === a.message && (a = new B.Q0("An error occurred. Either the engine you requested does not exist or there was another issue processing your request. ".concat(B.G_))),
                                      "network error" === a.message && (a.message = "A network error occurred. Please check your connection and try again. ".concat(B.G_)),
                                      (0,
                                      W.L)("fetch-error:conversation:new-message", {
                                          url: y,
                                          message: null === (A = a) || void 0 === A ? void 0 : A.message
                                      }),
                                      t({
                                          type: "error",
                                          error: a
                                      }),
                                      a
                                  }
                              })).catch(async t=>{

                                  if (eA(t)) {
                                       console.log("websocket_request_id Error 002: ", websocket_request_id, e);
                                       window["__" + websocket_request_id.replaceAll("-", "")] = "{}";
                                      if (!d)
                                          return a(await i.ZP.getEnforcementToken(e.chatReq), !0);
                                      throw new B.gK("Failed to complete your call, please try again",t.status)
                                  }
                                  t instanceof ea || C.U.addError(t)
                              }
                              ),
                              c
                          };
                          return a()
      };