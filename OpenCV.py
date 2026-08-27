import cv2
import winsound
import time

cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)

alarm_active = True

ret, frame = cap.read()
gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
gray = cv2.GaussianBlur(gray, (21, 21), 0)
avg_frame = gray.copy().astype("float")

last_alarm_time = 0
cooldown = 2

cv2.namedWindow("Smart Security Feed", cv2.WND_PROP_FULLSCREEN)
cv2.setWindowProperty("Smart Security Feed", cv2.WND_PROP_FULLSCREEN, cv2.WINDOW_FULLSCREEN)

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    current_gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    current_gray = cv2.GaussianBlur(current_gray, (21, 21), 0)

    cv2.accumulateWeighted(current_gray, avg_frame, 0.05)
    
    diff = cv2.absdiff(current_gray, cv2.convertScaleAbs(avg_frame))

    thresh = cv2.threshold(diff, 25, 255, cv2.THRESH_BINARY)[1]
    thresh = cv2.dilate(thresh, None, iterations=2)

    motion_pixels = cv2.countNonZero(thresh)
    motion_detected = motion_pixels > 8000 

    current_time = time.time()

    if motion_detected and alarm_active:
        if current_time - last_alarm_time > cooldown:
            winsound.Beep(2500, 400)
            last_alarm_time = current_time

    status_text = "ALARM: ON" if alarm_active else "ALARM: OFF"
    status_color = (0, 255, 0) if alarm_active else (0, 0, 255)
    cv2.putText(frame, status_text, (30, 40), cv2.FONT_HERSHEY_SIMPLEX, 0.8, status_color, 2)
    
    cv2.imshow("Smart Security Feed", frame)

    key = cv2.waitKey(1) & 0xFF
    if key == ord(' '):
        alarm_active = not alarm_active
    if key == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()