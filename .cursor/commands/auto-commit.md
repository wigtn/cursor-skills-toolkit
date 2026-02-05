# Auto Commit (Cursor용)

이 커맨드를 실행하면 코드 리뷰 후 커밋을 진행합니다.

## 사용법
Cursor에서 이 파일을 열고 "이 커맨드 실행해줘"라고 요청하세요.

---

## 실행 프로토콜

### Step 1: 변경사항 수집
```bash
git pull
git status
git diff --stat HEAD
```

### Step 2: 품질 검사
`.cursor/rules/commit-review.mdc`의 체크리스트를 따라 평가:
- Readability (20점)
- Maintainability (20점)
- Performance (20점)
- Best Practices (20점)
- Testability (20점)

**결과 보고:**
```
| 항목 | 점수 | 상태 |
|------|------|------|
| Readability | XX/20 | ✅/⚠️ |
| Maintainability | XX/20 | ✅/⚠️ |
| Performance | XX/20 | ✅/⚠️ |
| Best Practices | XX/20 | ✅/⚠️ |
| **Total** | **XX/100** | **PASS/FAIL** |
```

### Step 3: 사용자 확인
- 변경 파일 목록 보여주기
- 품질 점수 보여주기
- "커밋할까요?" 물어보기

### Step 4: 커밋 실행 (사용자 승인 후에만)
```bash
git add <specific-files>
git commit -m "<message>"
```

---

## 주의사항
- 품질 점수 80점 미만이면 수정 권장
- shared/ 변경 시 팀원 영향 알림
- .env, API 키 파일 절대 커밋 금지
- 사용자 확인 없이 절대 커밋하지 않음

---

## 실행
"이 프로토콜대로 현재 변경사항을 검사하고 커밋해줘"
