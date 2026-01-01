import { randomUUID } from 'crypto';

// 输入模型 (OpenAI-like)
export class ChatMessage {
  constructor({
    id = generateCustomId(),
    role,
    content,
    userId = null,
    createdAt = null,
    traceId = null
  }) {
    this.id = id;
    this.role = role; // "system", "user", "assistant"
    this.content = content;
    this.userId = userId;
    this.createdAt = createdAt;
    this.traceId = traceId;
  }
}

export class ChatCompletionRequest {
  constructor({
    messages,
    model = "notion-proxy",
    stream = false,
    notion_model = "anthropic-opus-4"
  }) {
    this.messages = messages;
    this.model = model;
    this.stream = stream;
    this.notion_model = notion_model;
  }
}

// Notion 模型
export class NotionTranscriptConfigValue {
  constructor({
    type = "workflow",
    model,
    modelFromUser = true,
    enableAgentAutomations = false,
    enableAgentIntegrations = false,
    enableBackgroundAgents = false,
    enableCustomAgents = false,
    enableExperimentalIntegrations = false,
    enableAgentViewNotificationsTool = false,
    enableAgentRevertTool = false,
    enableAgentDiffs = false,
    enableAgentCreateDbTemplate = false,
    enableCsvAttachmentSupport = true,
    enableDatabaseAgents = false,
    enableAgentThreadTools = false,
    enableRunAgentTool = false,
    enableAgentDashboards = false,
    enableAgentCardCustomization = true,
    enableSystemPromptAsPage = false,
    enableUserSessionContext = false,
    enableComputer = false,
    enableScriptAgent = false,
    enableAgentGenerateImage = false,
    enableAgentTodos = false,
    enableSpeculativeSearch = false,
    enableQueryCalendar = false,
    enableQueryMail = false,
    searchScopes = [{ type: "notion" }],
    useWebSearch = true,
    useReadOnlyMode = false,
    writerMode = false,
    isCustomAgent = false,
    isCustomAgentBuilder = false,
    useCustomAgentDraft = false,
    enableUpdatePageV2Tool = true,
    enableUpdatePageAutofixer = true,
    enableUpdateAgentV2Tools = true,
    enableUpdatePageMarkdownTree = false,
    enableUpdatePageTreeDiff = false,
    enableUpdatePageOrderUpdates = true,
    enableUpdatePageTreeDiffMetrics = false
  }) {
    this.type = type;
    this.model = model;
    this.modelFromUser = modelFromUser;
    this.enableAgentAutomations = enableAgentAutomations;
    this.enableAgentIntegrations = enableAgentIntegrations;
    this.enableBackgroundAgents = enableBackgroundAgents;
    this.enableCustomAgents = enableCustomAgents;
    this.enableExperimentalIntegrations = enableExperimentalIntegrations;
    this.enableAgentViewNotificationsTool = enableAgentViewNotificationsTool;
    this.enableAgentRevertTool = enableAgentRevertTool;
    this.enableAgentDiffs = enableAgentDiffs;
    this.enableAgentCreateDbTemplate = enableAgentCreateDbTemplate;
    this.enableCsvAttachmentSupport = enableCsvAttachmentSupport;
    this.enableDatabaseAgents = enableDatabaseAgents;
    this.enableAgentThreadTools = enableAgentThreadTools;
    this.enableRunAgentTool = enableRunAgentTool;
    this.enableAgentDashboards = enableAgentDashboards;
    this.enableAgentCardCustomization = enableAgentCardCustomization;
    this.enableSystemPromptAsPage = enableSystemPromptAsPage;
    this.enableUserSessionContext = enableUserSessionContext;
    this.enableComputer = enableComputer;
    this.enableScriptAgent = enableScriptAgent;
    this.enableAgentGenerateImage = enableAgentGenerateImage;
    this.enableAgentTodos = enableAgentTodos;
    this.enableSpeculativeSearch = enableSpeculativeSearch;
    this.enableQueryCalendar = enableQueryCalendar;
    this.enableQueryMail = enableQueryMail;
    this.searchScopes = searchScopes;
    this.useWebSearch = useWebSearch;
    this.useReadOnlyMode = useReadOnlyMode;
    this.writerMode = writerMode;
    this.isCustomAgent = isCustomAgent;
    this.isCustomAgentBuilder = isCustomAgentBuilder;
    this.useCustomAgentDraft = useCustomAgentDraft;
    this.enableUpdatePageV2Tool = enableUpdatePageV2Tool;
    this.enableUpdatePageAutofixer = enableUpdatePageAutofixer;
    this.enableUpdateAgentV2Tools = enableUpdateAgentV2Tools;
    this.enableUpdatePageMarkdownTree = enableUpdatePageMarkdownTree;
    this.enableUpdatePageTreeDiff = enableUpdatePageTreeDiff;
    this.enableUpdatePageOrderUpdates = enableUpdatePageOrderUpdates;
    this.enableUpdatePageTreeDiffMetrics = enableUpdatePageTreeDiffMetrics;
  }
}


export class NotionTranscriptContextValue {
  constructor({
    userId,
    spaceId,
    surface = "ai_module",
    timezone = "Asia/Shanghai",
    userName,
    userEmail = "",
    spaceName,
    spaceViewId,
    currentDatetime
  }) {
    this.timezone = timezone;
    this.userName = userName;
    this.userId = userId;
    this.userEmail = userEmail;
    this.spaceName = spaceName;
    this.spaceId = spaceId;
    this.spaceViewId = spaceViewId;
    this.currentDatetime = currentDatetime;
    this.surface = surface;
  }
}

export class NotionTranscriptItem {
  constructor({
    id = generateCustomId(),
    type,
    value = null,

  }) {
    this.id = id;
    this.type = type; // "markdown-chat", "agent-integration", "context"
    this.value = value;
  }
}

export class NotionTranscriptItemByuser {
  constructor({
    id = generateCustomId(),
    type,
    value = null,
    userId,
    createdAt

  }) {
    this.id = id;
    this.type = type; // "config", "user"
    this.value = value;
    this.userId = userId;
    this.createdAt = createdAt;
  }
}

export class NotionDebugOverrides {
  constructor({
    emitAgentSearchExtractedResults = true,
    cachedInferences = {},
    annotationInferences = {},
    emitInferences = false
  }) {
    this.emitAgentSearchExtractedResults = emitAgentSearchExtractedResults;
    this.cachedInferences = cachedInferences;
    this.annotationInferences = annotationInferences;
    this.emitInferences = emitInferences;
  }
}

export function generateCustomId() {
  // 创建固定部分
  const prefix1 = '2036702a';
  const prefix2 = '4d19';
  const prefix5 = '00aa';
  
  // 生成随机十六进制字符
  function randomHex(length) {
    return Array(length).fill(0).map(() => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
  }
  
  // 组合所有部分
  const part3 = '80' + randomHex(2);  // 8xxx
  const part4 = randomHex(4);        // xxxx
  const part5 = prefix5 + randomHex(8); // 00aaxxxxxxxx
  
  return `${prefix1}-${prefix2}-${part3}-${part4}-${part5}`;
}

export class NotionRequestBody {
  constructor({
    traceId = randomUUID(),
    spaceId,
    transcript,
    threadId = null,
    createThread = true,
    debugOverrides = new NotionDebugOverrides({}),
    generateTitle = true,
    saveAllThreadOperations = true,
    threadType = "workflow",
    isPartialTranscript = false,
    asPatchResponse = false,
    isUserInAnySalesAssistedSpace = false,
    isSpaceSalesAssisted = false
  }) {
    this.traceId = traceId;
    this.spaceId = spaceId;
    this.transcript = transcript;
    this.threadId = threadId;  // 始终包含 threadId
    this.createThread = createThread;
    this.debugOverrides = debugOverrides;
    this.generateTitle = generateTitle;
    this.saveAllThreadOperations = saveAllThreadOperations;
    this.threadType = threadType;
    this.isPartialTranscript = isPartialTranscript;
    this.asPatchResponse = asPatchResponse;
    this.isUserInAnySalesAssistedSpace = isUserInAnySalesAssistedSpace;
    this.isSpaceSalesAssisted = isSpaceSalesAssisted;
  }
}

// 输出模型 (OpenAI SSE)
export class ChoiceDelta {
  constructor({
    role = null,
    content = null,
    reasoning_content = null
  }) {
    if (role) this.role = role;
    if (content !== null) this.content = content;
    if (reasoning_content !== null) this.reasoning_content = reasoning_content;
  }
}

// Usage 统计
export class Usage {
  constructor({
    prompt_tokens = null,
    completion_tokens = null,
    total_tokens = null,
    cached_tokens_read = null,
    cached_tokens_created = null
  }) {
    this.prompt_tokens = prompt_tokens;
    this.completion_tokens = completion_tokens;
    this.total_tokens = total_tokens;
    if (cached_tokens_read !== null) this.cached_tokens_read = cached_tokens_read;
    if (cached_tokens_created !== null) this.cached_tokens_created = cached_tokens_created;
  }
}

export class Choice {
  constructor({
    index = 0,
    delta,
    finish_reason = null
  }) {
    this.index = index;
    this.delta = delta;
    this.finish_reason = finish_reason;
  }
}

export class ChatCompletionChunk {
  constructor({
    id = `chatcmpl-${randomUUID()}`,
    object = "chat.completion.chunk",
    created = Math.floor(Date.now() / 1000),
    model = "notion-proxy",
    choices,
    usage = null
  }) {
    this.id = id;
    this.object = object;
    this.created = created;
    this.model = model;
    this.choices = choices;
    if (usage) this.usage = usage;
  }
}

// 模型列表端点 /v1/models
export class Model {
  constructor({
    id,
    object = "model",
    created = Math.floor(Date.now() / 1000),
    owned_by = "notion"
  }) {
    this.id = id;
    this.object = object;
    this.created = created;
    this.owned_by = owned_by;
  }
}

export class ModelList {
  constructor({
    object = "list",
    data
  }) {
    this.object = object;
    this.data = data;
  }
} 