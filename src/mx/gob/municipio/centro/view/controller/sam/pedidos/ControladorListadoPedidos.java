package mx.gob.municipio.centro.view.controller.sam.pedidos;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import mx.gob.municipio.centro.model.gateways.sam.GatewayBeneficiario;
import mx.gob.municipio.centro.model.gateways.sam.GatewayPedidos;
import mx.gob.municipio.centro.model.gateways.sam.GatewayPlanArbit;
import mx.gob.municipio.centro.model.gateways.sam.GatewayUnidadAdm;
import mx.gob.municipio.centro.view.bases.ControladorBase;

@Controller
@RequestMapping("/sam/pedidos/lst_pedidos.action")

public class ControladorListadoPedidos extends ControladorBase {

	public ControladorListadoPedidos(){}
	
	final String STATUS_NUEVA="0"; 
	public final static  int VER_TODAS_LAS_UNIDADES = 25;
	
	@Autowired
	private GatewayUnidadAdm gatewayUnidadAdm;
	@Autowired
	private GatewayPlanArbit gatewayPlanArbit;
	
	@Autowired
	private GatewayBeneficiario gatewayBeneficiario;
	
	@Autowired
	GatewayPedidos gatewayPedidos;
	
	@SuppressWarnings("unchecked")	
	@RequestMapping(method = {RequestMethod.GET,RequestMethod.POST})  
	public String  requestGetControlador( Map modelo, HttpServletRequest request ) {
		boolean privilegio = this.getPrivilegioEn(this.getSesion().getIdUsuario(), VER_TODAS_LAS_UNIDADES);
		String verUnidad=request.getParameter("verUnidad");
		String verAlmacen=request.getParameter("verAlmacen");
		String idUnidad=request.getParameter("cbodependencia")==null ?this.getSesion().getClaveUnidad() : request.getParameter("cbodependencia");
		String estatus=request.getParameter("status")==null ? STATUS_NUEVA: this.arrayToString(request.getParameterValues("status"),",");
		String cve_benefi= request.getParameter("cboprestadorservicio");
		String beneficiario=request.getParameter("cboprestadorservicio");//beneficiario
		//String beneficiario=request.getParameter("txtprestadorservicio");
		//String cve_benefi=request.getParameter("CVE_BENEFI");
		String numped=request.getParameter("txtpedido");
		String numreq=request.getParameter("txtrequisicion");
		String cboconOP = request.getParameter("cboconOP");
		
		
		if(privilegio){
			if(request.getParameter("cbodependencia")==null)
				idUnidad = "0";
			if(request.getParameter("cbodependencia")!=null)
				idUnidad = request.getParameter("cbodependencia");
		}
		
		if(!privilegio){
			if(request.getParameter("cbodependencia")==null)
				idUnidad = this.getSesion().getClaveUnidad();
			if(request.getParameter("cbodependencia")!=null)
				idUnidad = request.getParameter("cbodependencia");
		}
		
		if(beneficiario==null ||beneficiario.equals("")) cve_benefi = "";
		
		//modelo.put("txtprestadorservicio",beneficiario);
		modelo.put("txtpedido", numped);
		modelo.put("txtrequisicion", numreq);
		modelo.put("idUnidad", idUnidad);
		modelo.put("cboconOP", cboconOP);
		modelo.put("nombreUnidad",this.getSesion().getUnidad());
		modelo.put("txtprestadorservicio",beneficiario );
		modelo.put("CVE_BENEFI",cve_benefi );
		modelo.put("verUnidad",verUnidad);
		modelo.put("ejercicio",this.getSesion().getEjercicio());
		modelo.put("fechaInicial",(request.getParameter("fechaInicial")==null ? "": request.getParameter("fechaInicial")));
		modelo.put("fechaFinal",(request.getParameter("fechaFinal")==null ? "": request.getParameter("fechaFinal")));
		modelo.put("status",estatus);
		modelo.put("tipo_gto", (request.getParameter("cbotipogasto")==null ? "": request.getParameter("cbotipogasto")));
		modelo.put("cbocapitulo", (request.getParameter("cbocapitulo")==null ? "": request.getParameter("cbocapitulo")));
		modelo.put("cboalmacen", (request.getParameter("cboalmacen")==null ? 0: Integer.parseInt(request.getParameter("cboalmacen").toString())));
		modelo.put("clv_benefi",gatewayBeneficiario.getBeneficiariosTodos(0));
		
		//determinar si solo puede filtrar capitulo 5000 en privilegios
		if(this.getPrivilegioEn(this.getSesion().getIdUsuario(), 113)){
			modelo.put("cbocapitulo" ,5000);
		}
		
		List <Map<String, Object>> lista = this.getListadoPedidos(idUnidad,estatus , modelo.get("fechaInicial").toString(), modelo.get("fechaFinal").toString(), cve_benefi, modelo.get("tipo_gto").toString(), this.getSesion().getEjercicio(), this.getSesion().getIdUsuario(), verUnidad, this.getSesion().getClaveUnidad() , numped, numreq, privilegio, modelo.get("cbocapitulo").toString(), Integer.parseInt(modelo.get("cboalmacen").toString()), cboconOP);
		modelo.put("listadoPedidos",lista);
		modelo.put("CONTADOR", lista.size());
		
		
		
	    return "sam/pedidos/lst_pedidos.jsp";
	}
	
	@ModelAttribute("unidadesAdmiva")
    public List<Map<String, Object>> getUnidades(){
    	return gatewayUnidadAdm.getUnidadAdmTodos();	
    }
	
	@RequestMapping(value = "/get_country_list", 
			method = RequestMethod.GET, 
			params="Accept=*/*")
	
	public @ResponseBody List<String> getCountryList(@RequestParam("term") String ncomercia) {
		List<String> countryList = gatewayBeneficiario.DummyDB(ncomercia);
		return countryList;
	}

	
	@ModelAttribute("capitulos")
    public List<Map<String, Object>> getCapitulos(){
    	return gatewayUnidadAdm.getCapitulos();	
    }
	
	@ModelAttribute("tipodeGasto")
    public List<Map<String, Object>> getTiposDeGasto(){
    	return gatewayPlanArbit.getTipodeGasto();
    }
	
	@ModelAttribute("beneficiarios")
	public List<Map<String, Object>> getBeneficiarios(){
		return gatewayBeneficiario.getListaBeneficiarios();
	}
	
	public List <Map<String, Object>>getListadoPedidos(String unidad , String estatus, String fechaInicial, String fechaFinal, String cve_benefi, String tipo_gto, Integer ejercicio, Integer idUsuario, String  verUnidad, String cve_uniusr, String numped, String numreq, boolean privilegio, String capitulo, int almacen, String cboconOP){
		return this.gatewayPedidos.getListadoPedidos(unidad, estatus,this.formatoFecha(fechaInicial) , this.formatoFecha(fechaFinal), cve_benefi, tipo_gto, ejercicio,idUsuario, verUnidad, cve_uniusr, numped, numreq, privilegio, capitulo, almacen, cboconOP);
	}
	
}
