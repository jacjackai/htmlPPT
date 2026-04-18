/**
 * @fileoverview Collaboration features for HTML PPT
 * @module collaboration
 */

/**
 * Collaboration modes
 */
export const CollaborationModes = {
  NONE: 'none',
  VIEW: 'view',
  COMMENT: 'comment',
  EDIT: 'edit',
};

/**
 * Comment class for slide comments
 */
export class Comment {
  /**
   * Create a new comment
   * @param {Object} options - Comment options
   * @param {string} options.id - Comment ID
   * @param {string} options.slideId - Slide ID
   * @param {string} options.author - Author name
   * @param {string} options.content - Comment content
   * @param {Date} options.timestamp - Comment timestamp
   * @param {boolean} options.resolved - Resolved status
   */
  constructor(options = {}) {
    this.id = options.id || this.generateId();
    this.slideId = options.slideId || '';
    this.author = options.author || 'Anonymous';
    this.content = options.content || '';
    this.timestamp = options.timestamp || new Date();
    this.resolved = options.resolved || false;
    this.replies = options.replies || [];
  }

  /**
   * Generate unique ID for comment
   * @returns {string} Unique ID
   */
  generateId() {
    return `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Add reply to comment
   * @param {Object} reply - Reply object
   */
  addReply(reply) {
    this.replies.push({
      ...reply,
      id: `reply_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
    });
  }

  /**
   * Resolve comment
   */
  resolve() {
    this.resolved = true;
  }

  /**
   * Unresolve comment
   */
  unresolve() {
    this.resolved = false;
  }

  /**
   * Convert comment to plain object
   * @returns {Object} Plain object representation
   */
  toJSON() {
    return {
      id: this.id,
      slideId: this.slideId,
      author: this.author,
      content: this.content,
      timestamp: this.timestamp,
      resolved: this.resolved,
      replies: this.replies,
    };
  }

  /**
   * Create comment from plain object
   * @param {Object} data - Plain object data
   * @returns {Comment} Comment instance
   */
  static fromJSON(data) {
    const comment = new Comment();
    Object.assign(comment, data);
    comment.timestamp = new Date(data.timestamp);
    return comment;
  }
}

/**
 * CollaborationManager class for managing collaboration features
 */
export class CollaborationManager {
  /**
   * Create collaboration manager
   * @param {Object} options - Collaboration manager options
   */
  constructor(options = {}) {
    this.mode = options.mode || CollaborationModes.NONE;
    this.comments = new Map();
    this.users = new Map();
    this.currentUser = options.currentUser || null;
    this.listeners = {};
  }

  /**
   * Set collaboration mode
   * @param {string} mode - Collaboration mode
   */
  setMode(mode) {
    this.mode = mode;
    this.emit('mode:change', mode);
  }

  /**
   * Get current mode
   * @returns {string} Current mode
   */
  getMode() {
    return this.mode;
  }

  /**
   * Add comment
   * @param {Object} options - Comment options
   * @returns {Comment} Created comment
   */
  addComment(options = {}) {
    const comment = new Comment({
      ...options,
      author: this.currentUser?.name || 'Anonymous',
    });

    this.comments.set(comment.id, comment);
    this.emit('comment:add', comment);
    return comment;
  }

  /**
   * Get comment by ID
   * @param {string} id - Comment ID
   * @returns {Comment|null} Comment or null
   */
  getComment(id) {
    return this.comments.get(id) || null;
  }

  /**
   * Get comments for slide
   * @param {string} slideId - Slide ID
   * @returns {Array<Comment>} Comments for slide
   */
  getCommentsForSlide(slideId) {
    return Array.from(this.comments.values()).filter((comment) => comment.slideId === slideId);
  }

  /**
   * Get all comments
   * @returns {Array<Comment>} All comments
   */
  getAllComments() {
    return Array.from(this.comments.values());
  }

  /**
   * Update comment
   * @param {string} id - Comment ID
   * @param {Object} updates - Updates to apply
   * @returns {Comment|null} Updated comment or null
   */
  updateComment(id, updates) {
    const comment = this.comments.get(id);
    if (comment) {
      Object.assign(comment, updates);
      this.emit('comment:update', comment);
      return comment;
    }
    return null;
  }

  /**
   * Delete comment
   * @param {string} id - Comment ID
   * @returns {boolean} Success status
   */
  deleteComment(id) {
    const comment = this.comments.get(id);
    if (comment) {
      this.comments.delete(id);
      this.emit('comment:delete', comment);
      return true;
    }
    return false;
  }

  /**
   * Resolve comment
   * @param {string} id - Comment ID
   * @returns {boolean} Success status
   */
  resolveComment(id) {
    const comment = this.comments.get(id);
    if (comment) {
      comment.resolve();
      this.emit('comment:resolve', comment);
      return true;
    }
    return false;
  }

  /**
   * Unresolve comment
   * @param {string} id - Comment ID
   * @returns {boolean} Success status
   */
  unresolveComment(id) {
    const comment = this.comments.get(id);
    if (comment) {
      comment.unresolve();
      this.emit('comment:unresolve', comment);
      return true;
    }
    return false;
  }

  /**
   * Add reply to comment
   * @param {string} commentId - Comment ID
   * @param {Object} reply - Reply object
   * @returns {boolean} Success status
   */
  addReply(commentId, reply) {
    const comment = this.comments.get(commentId);
    if (comment) {
      comment.addReply({
        ...reply,
        author: this.currentUser?.name || 'Anonymous',
      });
      this.emit('comment:reply', comment, reply);
      return true;
    }
    return false;
  }

  /**
   * Get unresolved comments
   * @returns {Array<Comment>} Unresolved comments
   */
  getUnresolvedComments() {
    return this.getAllComments().filter((comment) => !comment.resolved);
  }

  /**
   * Get comment count
   * @returns {number} Comment count
   */
  getCommentCount() {
    return this.comments.size;
  }

  /**
   * Get unresolved comment count
   * @returns {number} Unresolved comment count
   */
  getUnresolvedCommentCount() {
    return this.getUnresolvedComments().length;
  }

  /**
   * Set current user
   * @param {Object} user - User object
   */
  setCurrentUser(user) {
    this.currentUser = user;
    this.emit('user:change', user);
  }

  /**
   * Get current user
   * @returns {Object|null} Current user or null
   */
  getCurrentUser() {
    return this.currentUser;
  }

  /**
   * Add user
   * @param {Object} user - User object
   */
  addUser(user) {
    this.users.set(user.id, user);
    this.emit('user:add', user);
  }

  /**
   * Remove user
   * @param {string} userId - User ID
   */
  removeUser(userId) {
    const user = this.users.get(userId);
    if (user) {
      this.users.delete(userId);
      this.emit('user:remove', user);
    }
  }

  /**
   * Get user by ID
   * @param {string} userId - User ID
   * @returns {Object|null} User or null
   */
  getUser(userId) {
    return this.users.get(userId) || null;
  }

  /**
   * Get all users
   * @returns {Array<Object>} All users
   */
  getAllUsers() {
    return Array.from(this.users.values());
  }

  /**
   * Clear all comments
   */
  clearComments() {
    this.comments.clear();
    this.emit('comments:clear');
  }

  /**
   * Clear all users
   */
  clearUsers() {
    this.users.clear();
    this.emit('users:clear');
  }

  /**
   * Export comments
   * @returns {Array<Object>} Exported comments
   */
  exportComments() {
    return this.getAllComments().map((comment) => comment.toJSON());
  }

  /**
   * Import comments
   * @param {Array<Object>} data - Comments data
   */
  importComments(data) {
    data.forEach((commentData) => {
      const comment = Comment.fromJSON(commentData);
      this.comments.set(comment.id, comment);
    });
    this.emit('comments:import', data);
  }

  /**
   * Add event listener
   * @param {string} event - Event name
   * @param {Function} callback - Callback function
   */
  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  /**
   * Remove event listener
   * @param {string} event - Event name
   * @param {Function} callback - Callback function
   */
  off(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter((cb) => cb !== callback);
    }
  }

  /**
   * Emit event
   * @param {string} event - Event name
   * @param {*} data - Event data
   */
  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((callback) => callback(data));
    }
  }

  /**
   * Remove all event listeners
   */
  removeAllListeners() {
    this.listeners = {};
  }

  /**
   * Destroy collaboration manager
   */
  destroy() {
    this.clearComments();
    this.clearUsers();
    this.removeAllListeners();
    this.currentUser = null;
  }
}

/**
 * Create comment HTML
 * @param {Comment} comment - Comment instance
 * @param {boolean} canEdit - Can edit comment
 * @returns {string} Comment HTML
 */
export function createCommentHTML(comment, canEdit = false) {
  const date = new Date(comment.timestamp).toLocaleString();

  return `
    <div class="comment" data-comment-id="${comment.id}" data-resolved="${comment.resolved}">
      <div class="comment-header">
        <span class="comment-author">${comment.author}</span>
        <span class="comment-date">${date}</span>
        ${comment.resolved ? '<span class="comment-resolved-badge">已解决</span>' : ''}
      </div>
      <div class="comment-content">${comment.content}</div>
      <div class="comment-actions">
        ${
          canEdit
            ? `
          <button class="comment-btn comment-reply-btn" data-action="reply">回复</button>
          <button class="comment-btn comment-resolve-btn" data-action="resolve">
            ${comment.resolved ? '取消解决' : '解决'}
          </button>
          <button class="comment-btn comment-delete-btn" data-action="delete">删除</button>
        `
            : ''
        }
      </div>
      ${
        comment.replies.length > 0
          ? `
        <div class="comment-replies">
          ${comment.replies
            .map(
              (reply) => `
            <div class="comment-reply">
              <div class="reply-header">
                <span class="reply-author">${reply.author}</span>
                <span class="reply-date">${new Date(reply.timestamp).toLocaleString()}</span>
              </div>
              <div class="reply-content">${reply.content}</div>
            </div>
          `
            )
            .join('')}
        </div>
      `
          : ''
      }
    </div>
  `;
}

/**
 * Create comments panel HTML
 * @param {Array<Comment>} comments - Comments array
 * @param {boolean} canEdit - Can edit comments
 * @returns {string} Comments panel HTML
 */
export function createCommentsPanel(comments, canEdit = false) {
  return `
    <div class="comments-panel">
      <div class="comments-header">
        <h3>评论 (${comments.length})</h3>
        ${canEdit ? '<button class="add-comment-btn">添加评论</button>' : ''}
      </div>
      <div class="comments-list">
        ${
          comments.length > 0
            ? comments.map((comment) => createCommentHTML(comment, canEdit)).join('')
            : '<div class="no-comments">暂无评论</div>'
        }
      </div>
    </div>
  `;
}
