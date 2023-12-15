var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function getUsers() {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios.get('https://jsonplaceholder.typicode.com/users')];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.data];
            }
        });
    });
}
function getPosts() {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios.get('https://jsonplaceholder.typicode.com/posts')];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.data];
            }
        });
    });
}
function displayData(usersWithPosts) {
    return __awaiter(this, void 0, void 0, function () {
        var container;
        return __generator(this, function (_a) {
            container = document.getElementById('user-posts');
            container.innerHTML = '';
            usersWithPosts.forEach(function (user) {
                var userColumn = document.createElement('div');
                userColumn.className = 'col-md-4 content-column';
                var userCard = document.createElement('div');
                userCard.className = 'content-card';
                userCard.innerHTML = "\n      <div class=\"content-card-body\">\n        <h5 class=\"content-card-title\">".concat(user.name, "</h5>\n        <h6 class=\"content-card-text text-secondary\">").concat(user.email, "</h6>\n        <p class=\"text-warning\">Titre des articles r\u00E9dig\u00E9s:</p>\n        <ul>\n          ").concat(user.posts.map(function (post) { return "<li>".concat(post.title, "</li>"); }).join(''), "\n        </ul>\n      </div>\n    ");
                userColumn.appendChild(userCard);
                container.appendChild(userColumn);
            });
            return [2 /*return*/];
        });
    });
}
function loadData() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, users, posts_1, usersWithPosts, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Promise.all([getUsers(), getPosts()])];
                case 1:
                    _a = _b.sent(), users = _a[0], posts_1 = _a[1];
                    usersWithPosts = users.map(function (user) { return (__assign(__assign({}, user), { posts: posts_1.filter(function (post) { return post.userId === user.id; }) })); });
                    displayData(usersWithPosts);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    console.error('There was an error fetching the data', error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function filterData() {
    return __awaiter(this, void 0, void 0, function () {
        var titleInput, authorInput, titleQuery, authorQuery, _a, users, posts, filteredPosts, usersWithFilteredPosts;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    titleInput = document.getElementById('search-title');
                    authorInput = document.getElementById('search-author');
                    titleQuery = titleInput.value.toLowerCase();
                    authorQuery = authorInput.value.toLowerCase();
                    return [4 /*yield*/, Promise.all([getUsers(), getPosts()])];
                case 1:
                    _a = _b.sent(), users = _a[0], posts = _a[1];
                    filteredPosts = posts.filter(function (post) { return post.title.toLowerCase().includes(titleQuery); });
                    usersWithFilteredPosts = users
                        .map(function (user) { return (__assign(__assign({}, user), { posts: filteredPosts.filter(function (post) { return post.userId === user.id; }) })); })
                        .filter(function (user) { return user.name.toLowerCase().includes(authorQuery) && user.posts.length > 0; });
                    displayData(usersWithFilteredPosts);
                    return [2 /*return*/];
            }
        });
    });
}
document.getElementById('search-btn').addEventListener('click', filterData);
loadData();
