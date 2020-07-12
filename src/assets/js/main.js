// ページの読み込みを待つ
window.addEventListener('load', init);

function init() {

    // サイズを指定
    const width = window.innerWidth;// 横幅100%
    const height = window.innerHeight;// 高さ100%

    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('canvas'),//描画領域を取得
        alpha: true,//透過
    });
    renderer.shadowMap.enabled = true;


    // シーンを作成
    const scene = new THREE.Scene();


    // カメラを作成
    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(0, 0, 1000);//カメラの初期位置
    camera.lookAt(scene.position);//原点にカメラを向ける

    //ライトを作成
    const light = new THREE.DirectionalLight(0xFFFFFF, 1);
    light.position.set(0, 400, 1000);//ライトの初期位置
    scene.add(light);

    // 平面を作成
    const geometry = new THREE.PlaneGeometry(800, 400, 1, 1);//ジオメトリ
    const loader = new THREE.TextureLoader();//テクスチャ
    const texture = loader.load('./assets/images/img.jpg');//画像
    const material = new THREE.MeshLambertMaterial({
        map: texture
    });//マテリアル
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    // 平面を作成
    const geometry02 = new THREE.PlaneGeometry(800, 400, 1, 1);//ジオメトリ
    const loader02 = new THREE.TextureLoader();//テクスチャ
    const texture02 = loader02.load('./assets/images/img.jpg');//画像
    const material02 = new THREE.MeshLambertMaterial({
        map: texture02
    });//マテリアル
    const plane02 = new THREE.Mesh(geometry02, material02);
    plane02.rotation.x = Math.PI;
    scene.add(plane02);


    tick();

    // 初期化のために実行
    onResize();
    // リサイズイベント発生時に実行
    window.addEventListener('resize', onResize);

    function onResize() {
        // サイズを取得
        const width = window.innerWidth;
        const height = window.innerHeight;

        // レンダラーのサイズを調整する
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);

        // カメラのアスペクト比を正す
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }

    //OrbitControls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // 毎フレーム時に実行されるループイベントです
    function tick() {

        renderer.render(scene, camera); // レンダリング

        requestAnimationFrame(tick);
    }
}