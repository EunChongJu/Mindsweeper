/* 
 * MindSweeper Game Framework 2.0
 * 
 * 1. 난이도를 선택하고 먼저 맵을 생성한다. -> 클래스를 이용해 새로운 생성자를 만들면 됨.
 * 2. 사용자가 좌표를 클릭한다. (테스트를 위해 랜덤으로)
 * 3. 지뢰를 배치한다. 이때 사용자가 입력한 곳에는 지뢰가 배치되지 않도록 피해가야 함.
 * 4. 지뢰를 배치 완료하면 지뢰 위치를 키값으로 이루어진 배열로 저장한다.
 * 5. 그 배열을 통해 지뢰의 위치 주변 값을 하나씩 올리도록 한다.
 * 6. 지뢰의 위치를 저장한 배열에 따라 지뢰의 위치에 지뢰값을 저장한다.
 * 7. 그리고 사용자가 클릭한 시점에서 주변이 0인 부분만 걷어내고 지뢰를 제외한 숫자를 보여준다. (참고: 지뢰 게임)
 * 8. 그리고 게임이 시작.
 * 9. 게임에서 지뢰가 터지면 즉시 게임 오버된다.
 * 
 * *** 업그레이드 내용 ***
 * 1. 게임 실행 함수를 클래스로 전환 - new를 이용해 새로 호출 가능.
 * 2. 게임 실행 순서를 바꾸어 첫 시도에 우연히 지뢰가 터지지 않도록 함.
 * 3. 기존의 버전은 CUI 한정에 한해 사용 가능했으나, CUI는 물론 TUI, GUI 환경에서도 사용할 수 있도록 업그레이드함.
 * 4. ???
 * 
 */

// 클래스 만들려고 했는데 기초가 어떻게 돌아갈지부터 마련하고 함수를 클래스로 전환해도 늦지 않을 것이다.

// Library Functions


// Functions

// 맵을 생성한다.
function newMap(size) {
	var {w,h} = size;
//	console.log("w: "+w+", h: "+h);
	
	
}

// 2차원 배열 생성 : 지도를 제공하기 위함
function newTwiceArray(w,h) {
	var arr = new Array(w);
	
	for (var i = 0; i < w; i++) {
		arr[i] = new Array(h);
	}
	
	return arr;
}

// 난이도에 따라 맵의 사이즈를 반환한다.
function sizeofLevel(lv) {
	var min = 9, max = 50;
	
	var size = {w: 0, h: 0};
	switch(lv) {
		case 1:
			size = {w: 9, h: 9};	// 지뢰 갯수: 10, 12.345679012345679012345679012346 %
			break;
		case 2:
			size = {w: 16, h: 16};	// 지뢰 갯수: 40, 15.625 %
			break;
		case 3:
			size = {w: 30, h: 16};	// 지뢰 갯수: 99, 20.625 %
			break;
		default:
			size = {w: Math.floor(Math.random()*(max-min+1))+min, h: Math.floor(Math.random()*(max-min+1))+min}//최댓값도 포함, 최솟값도 포함
			break;
	}
	return size;
}

// 난이도를 선택한다. (1: Easy, 2: Middle, 3: Hard)
function selectLevel() {
	console.log("난이도를 선택해 주세요. (1 ~ 3, 이외의 숫자는 랜덤으로 생성)");
	
	var lv = 1; // input(":");
	
	return lv;
}




// Main Function

function main() {
	
	var map = new newMap(sizeofLevel(selectLevel()));
	
	return 0;
}


//TEST
main();
