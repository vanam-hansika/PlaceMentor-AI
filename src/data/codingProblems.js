// ============================================
// PlaceMentor AI — Coding Problems Dataset
// Starter templates are clean signatures; solution codes stored separately for "Show Solution & Explanation"
// ============================================

export const codingProblems = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Arrays',
    solvedCount: 1420,
    rating: 4.8,
    statement: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.`,
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    sampleInput: 'nums = [2,7,11,15], target = 9',
    sampleOutput: '[0,1]',
    explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
    starterTemplates: {
      python: `def twoSum(nums, target):\n    # Write your solution here\n    pass\n`,
      javascript: `function twoSum(nums, target) {\n    // Write your solution here\n    return [];\n}`,
      cpp: `#include <vector>\n\nstd::vector<int> twoSum(std::vector<int>& nums, int target) {\n    // Write your solution here\n    return {};\n}`,
      java: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your solution here\n        return new int[]{};\n    }\n}`
    },
    solutions: {
      python: `def twoSum(nums, target):\n    hash_map = {}\n    for i, num in enumerate(nums):\n        diff = target - num\n        if diff in hash_map:\n            return [hash_map[diff], i]\n        hash_map[num] = i\n    return []\n`,
      javascript: `function twoSum(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const diff = target - nums[i];\n        if (map.has(diff)) {\n            return [map.get(diff), i];\n        }\n        map.set(nums[i], i);\n    }\n    return [];\n}`,
      cpp: `#include <vector>\n#include <unordered_map>\n\nstd::vector<int> twoSum(std::vector<int>& nums, int target) {\n    std::unordered_map<int, int> map;\n    for (int i = 0; i < nums.size(); i++) {\n        int diff = target - nums[i];\n        if (map.count(diff)) return {map[diff], i};\n        map[nums[i]] = i;\n    }\n    return {};\n}`,
      java: `import java.util.HashMap;\n\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        HashMap<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int diff = target - nums[i];\n            if (map.containsKey(diff)) {\n                return new int[] { map.get(diff), i };\n            }\n            map.put(nums[i], i);\n        }\n        return new int[]{};\n    }\n}`
    },
    hints: [
      'Can you solve this in O(N) time using a Hash Map?',
      'Store each number\'s index as you iterate through the array.'
    ]
  },
  {
    id: 'valid-palindrome',
    title: 'Valid Palindrome',
    difficulty: 'Easy',
    category: 'Strings',
    solvedCount: 980,
    rating: 4.6,
    statement: `A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.`,
    constraints: [
      '1 <= s.length <= 2 * 10^5',
      's consists only of printable ASCII characters.'
    ],
    sampleInput: 's = "A man, a plan, a canal: Panama"',
    sampleOutput: 'true',
    explanation: '"amanaplanacanalpanama" is a palindrome.',
    starterTemplates: {
      python: `def isPalindrome(s: str) -> bool:\n    # Write your solution here\n    pass\n`,
      javascript: `function isPalindrome(s) {\n    // Write your solution here\n    return false;\n}`,
      cpp: `#include <string>\n\nbool isPalindrome(std::string s) {\n    // Write your solution here\n    return false;\n}`,
      java: `class Solution {\n    public boolean isPalindrome(String s) {\n        // Write your solution here\n        return false;\n    }\n}`
    },
    solutions: {
      python: `def isPalindrome(s: str) -> bool:\n    filtered = [c.lower() for c in s if c.isalnum()]\n    return filtered == filtered[::-1]\n`,
      javascript: `function isPalindrome(s) {\n    const str = s.toLowerCase().replace(/[^a-z0-9]/g, '');\n    return str === str.split('').reverse().join('');\n}`,
      cpp: `#include <string>\n#include <cctype>\n\nbool isPalindrome(std::string s) {\n    int l = 0, r = s.length() - 1;\n    while (l < r) {\n        while (l < r && !isalnum(s[l])) l++;\n        while (l < r && !isalnum(s[r])) r--;\n        if (tolower(s[l]) != tolower(s[r])) return false;\n        l++; r--;\n    }\n    return true;\n}`,
      java: `class Solution {\n    public boolean isPalindrome(String s) {\n        String str = s.toLowerCase().replaceAll("[^a-z0-9]", "");\n        String rev = new StringBuilder(str).reverse().toString();\n        return str.equals(rev);\n    }\n}`
    },
    hints: [
      'Use two pointers starting from left and right.',
      'Skip non-alphanumeric characters as you move pointers.'
    ]
  },
  {
    id: 'reverse-linked-list',
    title: 'Reverse Linked List',
    difficulty: 'Medium',
    category: 'Linked List',
    solvedCount: 1150,
    rating: 4.9,
    statement: `Given the head of a singly linked list, reverse the list, and return the reversed list.`,
    constraints: [
      'The number of nodes in the list is in the range [0, 5000].',
      '-5000 <= Node.val <= 5000'
    ],
    sampleInput: 'head = [1,2,3,4,5]',
    sampleOutput: '[5,4,3,2,1]',
    explanation: 'Reverse the direction of pointers of each node.',
    starterTemplates: {
      python: `class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef reverseList(head):\n    # Write your solution here\n    pass\n`,
      javascript: `function reverseList(head) {\n    // Write your solution here\n    return null;\n}`,
      cpp: `struct ListNode {\n    int val;\n    ListNode *next;\n};\n\nListNode* reverseList(ListNode* head) {\n    // Write your solution here\n    return nullptr;\n}`,
      java: `class ListNode {\n    int val;\n    ListNode next;\n}\n\nclass Solution {\n    public ListNode reverseList(ListNode head) {\n        // Write your solution here\n        return null;\n    }\n}`
    },
    solutions: {
      python: `class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef reverseList(head):\n    prev = None\n    curr = head\n    while curr:\n        nxt = curr.next\n        curr.next = prev\n        prev = curr\n        curr = nxt\n    return prev\n`,
      javascript: `function reverseList(head) {\n    let prev = null;\n    let curr = head;\n    while (curr) {\n        let next = curr.next;\n        curr.next = prev;\n        prev = curr;\n        curr = next;\n    }\n    return prev;\n}`,
      cpp: `struct ListNode {\n    int val;\n    ListNode *next;\n};\n\nListNode* reverseList(ListNode* head) {\n    ListNode* prev = nullptr;\n    ListNode* curr = head;\n    while (curr) {\n        ListNode* next = curr->next;\n        curr->next = prev;\n        prev = curr;\n        curr = next;\n    }\n    return prev;\n}`,
      java: `class ListNode {\n    int val;\n    ListNode next;\n}\n\nclass Solution {\n    public ListNode reverseList(ListNode head) {\n        ListNode prev = null;\n        ListNode curr = head;\n        while (curr != null) {\n            ListNode next = curr.next;\n            curr.next = prev;\n            prev = curr;\n            curr = next;\n        }\n        return prev;\n    }\n}`
    },
    hints: [
      'Keep track of prev, curr, and next pointers.',
      'Iterate through the list reversing pointers one by one.'
    ]
  }
];
